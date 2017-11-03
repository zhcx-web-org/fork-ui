<script>
  const data = [{
    label: '一级 1',
    children: [{
      label: '二级 1-1',
      children: [{
        label: '三级 1-1-1'
      }]
    }]
  }, {
    label: '一级 2',
    children: [{
      label: '二级 2-1',
      children: [{
        label: '三级 2-1-1'
      }]
    }, {
      label: '二级 2-2',
      children: [{
        label: '三级 2-2-1'
      }]
    }]
  }, {
    label: '一级 3',
    children: [{
      label: '二级 3-1',
      children: [{
        label: '三级 3-1-1'
      }]
    }, {
      label: '二级 3-2',
      children: [{
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
        value: ''
      };
    }
  };
</script>

<style>
  .demo-select .el-select {
    width: 240px;
  }
</style>

## Select 树选择器

树型下拉框

### 基础用法

目前只适用于单选树节点。
:::demo `v-model`的值为当前被选中的Tree节点数据对象，`tree-data`、`tree-props`属性为Tree组件的属性。
```html
<template>
  <el-select-tree v-model="value" :tree-data="data" :tree-props="props" :clearable="true" placeholder="请选择"></el-select-tree>
</template>

<script>
  const data = [{
    label: '一级 1',
    children: [{
      label: '二级 1-1',
      children: [{
        label: '三级 1-1-1'
      }]
    }]
  }, {
    label: '一级 2',
    children: [{
      label: '二级 2-1',
      children: [{
        label: '三级 2-1-1'
      }]
    }, {
      label: '二级 2-2',
      children: [{
        label: '三级 2-2-1'
      }]
    }]
  }, {
    label: '一级 3',
    children: [{
      label: '二级 3-1',
      children: [{
        label: '三级 3-1-1'
      }]
    }, {
      label: '二级 3-2',
      children: [{
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
        value: ''
      };
    }
  };
</script>
```
:::