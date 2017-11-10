<script>
  const data = [{
    uuid: 1,
    label: '一级 1',
    children: [{
      uuid: 11,
      label: '二级 1-1',
      children: [{
        uuid: 111,
        label: '三级 1-1-1'
      }]
    }]
  }, {
    uuid: 2,
    label: '一级 2',
    children: [{
      uuid: 21,
      label: '二级 2-1',
      children: [{
        uuid: 211,
        label: '三级 2-1-1'
      }]
    }, {
      uuid: 22,
      label: '二级 2-2',
      children: [{
        uuid: 221,
        label: '三级 2-2-1'
      }]
    }]
  }, {
    uuid: 3,
    label: '一级 3',
    children: [{
      uuid: 31,
      label: '二级 3-1',
      children: [{
        uuid: 311,
        label: '三级 3-1-1'
      }]
    }, {
      uuid: 32,
      label: '二级 3-2',
      children: [{
        uuid: 321,
        label: '三级 3-2-1'
      }]
    }]
  }];

  const props = {
    children: 'children',
    label: 'label'
  };

  export default {
    data() {
      return {
        data,
        props,
        value1: 1,
        value2: {
          uuid: 111,
          label: '三级 1-1-1'
        }
      };
    },
    methods: {
      clickHandleClear() {
        this.value1 = '';
      },
      clickHandleSetValue() {
        this.value1 = 1;
      }
    }
  };
</script>

<style>
  .demo-select .el-select {
    /* width: 240px; */
  }
</style>

## Select 树选择器

树型下拉框

### 基础用法

目前只适用于单选树节点。
:::demo `v-model`的值为当前被选中的Tree节点数据对象，`value-key`为可选项，可以让`v-model`绑定Tree选中节点对象的某个属性比如uuid。`tree-data`、`tree-props`属性为Tree组件的属性，
```html
<template>
  <el-select-tree v-model="value1" :value-key="'uuid'" :tree-data="data" :tree-props="props" :clearable="true" placeholder="请选择"></el-select-tree>
  <hr>
  value: {{value1}}
  <hr>
  <el-button @click="clickHandleClear">清空</el-button><el-button @click="clickHandleSetValue">设置node.id=1</el-button>
</template>

<script>
  const data = [{
    uuid: 1,
    label: '一级 1',
    children: [{
      uuid: 11,
      label: '二级 1-1',
      children: [{
        uuid: 111,
        label: '三级 1-1-1'
      }]
    }]
  }, {
    uuid: 2,
    label: '一级 2',
    children: [{
      uuid: 21,
      label: '二级 2-1',
      children: [{
        uuid: 211,
        label: '三级 2-1-1'
      }]
    }, {
      uuid: 22,
      label: '二级 2-2',
      children: [{
        uuid: 221,
        label: '三级 2-2-1'
      }]
    }]
  }, {
    uuid: 3,
    label: '一级 3',
    children: [{
      uuid: 31,
      label: '二级 3-1',
      children: [{
        uuid: 311,
        label: '三级 3-1-1'
      }]
    }, {
      uuid: 32,
      label: '二级 3-2',
      children: [{
        uuid: 321,
        label: '三级 3-2-1'
      }]
    }]
  }];

  const props = {
    children: 'children',
    label: 'label'
  };

  export default {
    data() {
      return {
        data,
        props,
        value1: 1
      };
    }
  };
</script>
```
:::

### 基础用法2

目前只适用于单选树节点。
:::demo `v-model`的值为当前被选中的Tree节点数据对象。`tree-data`、`tree-props`属性为Tree组件的属性，
```html
<template>
  <el-select-tree v-model="value2" :tree-data="data" :tree-props="props" :clearable="true" placeholder="请选择"></el-select-tree>
  <hr>
  value: {{value2}}
</template>

<script>
  const data = [{
    uuid: 1,
    label: '一级 1',
    children: [{
      uuid: 11,
      label: '二级 1-1',
      children: [{
        uuid: 111,
        label: '三级 1-1-1'
      }]
    }]
  }, {
    uuid: 2,
    label: '一级 2',
    children: [{
      uuid: 21,
      label: '二级 2-1',
      children: [{
        uuid: 211,
        label: '三级 2-1-1'
      }]
    }, {
      uuid: 22,
      label: '二级 2-2',
      children: [{
        uuid: 221,
        label: '三级 2-2-1'
      }]
    }]
  }, {
    uuid: 3,
    label: '一级 3',
    children: [{
      uuid: 31,
      label: '二级 3-1',
      children: [{
        uuid: 311,
        label: '三级 3-1-1'
      }]
    }, {
      uuid: 32,
      label: '二级 3-2',
      children: [{
        uuid: 321,
        label: '三级 3-2-1'
      }]
    }]
  }];

  const props = {
    children: 'children',
    label: 'label'
  };

  export default {
    data() {
      return {
        data,
        props,
        value2: {
          uuid: 111,
          label: '三级 1-1-1'
        }
      };
    }
  };
</script>
```
:::