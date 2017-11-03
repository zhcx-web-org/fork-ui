<template>
  <div
    class="el-select"
    v-clickoutside="handleClose">
    <el-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :size="size"
      :disabled="disabled"
      :readonly="true"
      :validate-event="false"
      @focus="handleFocus"
      @click="handleIconClick"
      @mousedown.native="handleMouseDown"
      @keyup.native="debouncedOnInputChange"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @paste.native="debouncedOnInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
      :icon="iconClass">
    </el-input>
    <transition
      name="el-zoom-in-top"
      @after-leave="doDestroy">
      <el-select-menu
        ref="popper"
        v-show="visible && emptyText !== false">
        <el-scrollbar
          tag="div"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          v-show="treeData.length > 0">
          <el-tree :data="treeData" :props="treeProps" :default-expand-all="true" :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
        </el-scrollbar>
        <p class="el-select-dropdown__empty" v-if="emptyText && (treeData.length === 0)">{{ emptyText }}</p>
      </el-select-menu>
    </transition>
  </div>
</template>

<style scoped>
  .el-select-dropdown .el-tree {
    border: 0;
  }
</style>

<script type="text/babel">
  import Emitter from 'ele-fork-ui/src/mixins/emitter';
  import Locale from 'ele-fork-ui/src/mixins/locale';
  import ElInput from 'ele-fork-ui/packages/input';
  import ElSelectMenu from 'ele-fork-ui/packages/select/src/select-dropdown.vue';
  import ElScrollbar from 'ele-fork-ui/packages/scrollbar';
  import debounce from 'throttle-debounce/debounce';
  import Clickoutside from 'ele-fork-ui/src/utils/clickoutside';
  import { addClass, removeClass, hasClass } from 'ele-fork-ui/src/utils/dom';
  import { addResizeListener, removeResizeListener } from 'ele-fork-ui/src/utils/resize-event';
  import { t } from 'ele-fork-ui/src/locale';
  import Tree from 'ele-fork-ui/packages/tree';

  export default {
    mixins: [Emitter, Locale],

    name: 'ElSelectTree',

    componentName: 'ElSelectTree',

    computed: {
      /** Read */
      iconClass() {
        let criteria = this.clearable &&
          !this.disabled &&
          this.inputHovering &&
          this.value !== undefined &&
          this.value !== '';
        return criteria ? 'circle-close is-show-close' : 'caret-top';
      },

      debounce() {
        return 0;
      },

      emptyText() {
        if (this.treeData.length === 0) {
          return this.noDataText || this.t('el.select.noData');
        }
        return null;
      }
    },

    components: {
      ElInput,
      ElSelectMenu,
      ElScrollbar,
      Tree
    },

    directives: { Clickoutside },

    props: {
      treeData: Array,
      treeProps: {
        default() {
          return {
            children: 'children',
            label: 'label'
          };
        }
      },
      name: String,
      value: {
        required: true
      },
      size: String,
      disabled: Boolean,
      clearable: Boolean,
      noDataText: String,
      placeholder: {
        type: String,
        default() {
          return t('el.select.placeholder');
        }
      }
    },

    data() {
      return {
        showCheckbox: true,
        createdLabel: null,
        createdSelected: false,
        selected: {},
        inputLength: 20,
        inputWidth: 0,
        cachedPlaceHolder: '',
        visible: false,
        selectedLabel: '',
        inputHovering: false,
        currentPlaceholder: ''
      };
    },

    watch: {
      /** Read */
      placeholder(val) {
        this.cachedPlaceHolder = this.currentPlaceholder = val;
      },

      /** Read */
      value(val) {
        this.setSelected();
        this.$emit('change', val);
        this.dispatch('ElFormItem', 'el.form.change', val);
      },

      /** Read */
      visible(val) {
        if (!val) {
          this.$refs.reference.$el.querySelector('input').blur();
          this.handleIconHide();
          this.broadcast('ElSelectDropdown', 'destroyPopper');
          this.selectedLabel = '';
          this.inputLength = 20;
          if (this.selected) {
            this.selectedLabel = this.selected.currentLabel;
          }
        } else {
          this.handleIconShow();
          this.broadcast('ElSelectDropdown', 'updatePopper');
        }
        this.$emit('visible-change', val);
      }
    },

    methods: {
      /** Read */
      handleNodeClick(data) {
        if (this.disabled !== true) {
          this.handleOptionSelect(data);
        }
      },

      /** Read */
      handleIconHide() {
        let icon = this.$el.querySelector('.el-input__icon');
        if (icon) {
          removeClass(icon, 'is-reverse');
        }
      },

      /** Read */
      handleIconShow() {
        let icon = this.$el.querySelector('.el-input__icon');
        if (icon && !hasClass(icon, 'el-icon-circle-close')) {
          addClass(icon, 'is-reverse');
        }
      },

      /** Read */
      getOption(value) {
        return {
          value: value,
          currentLabel: value.label
        };
      },

      /** Read */
      setSelected() {
        let option = this.getOption(this.value);
        if (option.created) {
          this.createdLabel = option.currentLabel;
          this.createdSelected = true;
        } else {
          this.createdSelected = false;
        }
        this.selectedLabel = option.currentLabel;
        this.selected = option;
      },

      /** Read */
      handleFocus() {
        this.visible = true;
      },

      /** Read */
      handleIconClick(event) {
        if (this.iconClass.indexOf('circle-close') > -1) {
          this.deleteSelected(event);
        } else {
          this.toggleMenu();
        }
      },

      /** Read */
      handleMouseDown(event) {
        if (event.target.tagName !== 'INPUT') return;
        if (this.visible) {
          this.handleClose();
          event.preventDefault();
        }
      },

      /** Read */
      doDestroy() {
        this.$refs.popper && this.$refs.popper.doDestroy();
        this.dropdownUl = null;
      },

      /** Read */
      handleClose() {
        this.visible = false;
      },

      /** Read */
      managePlaceholder() {
        if (this.currentPlaceholder !== '') {
          this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
        }
      },

      /** Read */
      handleOptionSelect(option) {
        this.$emit('input', option);
        this.visible = false;
      },

      /** Read */
      toggleMenu() {
        if (!this.disabled) {
          this.visible = !this.visible;
        }
      },

      /** Read */
      deleteSelected(event) {
        event.stopPropagation();
        this.$emit('input', '');
        this.visible = false;
        this.$emit('clear');
      },

      /** Read */
      resetInputWidth() {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
      },

      /** Read */
      handleResize() {
        this.resetInputWidth();
      }
    },

    created() {
      this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
      if (Array.isArray(this.value)) {
        this.$emit('input', '');
      }

      this.debouncedOnInputChange = debounce(this.debounce, () => {
        this.onInputChange();
      });
    },

    mounted() {
      addResizeListener(this.$el, this.handleResize);
      this.$nextTick(() => {
        if (this.$refs.reference && this.$refs.reference.$el) {
          this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
        }
      });
    },

    beforeDestroy() {
      if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
    }
  };
</script>
