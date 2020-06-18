import Vue from 'vue';
import App from './App';

Vue.filter('formatDate', value => {
  var date = new Date(value);
  var Y = date.getFullYear() + '-';
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  // var h = date.getHours() + ':';
  // var m = date.getMinutes() + ':';
  // var s = date.getSeconds();
  return Y + M + D;
});

Vue.filter('formatWeight', value => {
  return (
    (+value || 0)
      // .toString()
      .toFixed(4)
      .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  );
});

Vue.filter('formatAmount', value => {
  if (
    typeof value === 'undefined' ||
    value === null ||
    value === '' ||
    isNaN(value)
  ) {
    return '0.00';
  } else if (typeof value === 'string' && value.indexOf(',') !== -1) {
    value = parseFloat(value.split(',').join(''));
  } else {
    return parseFloat(value)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
});

Vue.filter('formatStatus', val => {
  if (val == '1') {
    return '开票';
  } else if (val == '2') {
    return '收票';
  } else if (val == '7') {
    return '背书';
  } else if (val == '5') {
    return '背书(开票)';
  }
});

Vue.filter('formatStyle', val => {
  if (val == 'bankA') {
    return 'A';
  } else if (val == 'bankB') {
    return 'B';
  } else if (val == 'C') {
    return '现金户';
  } else if (val == 'D') {
    return '贴现';
  }
});

Vue.filter('formatFinished', value => {
  if (value === '0') {
    return '未完成';
  } else if (value === '1') {
    return '已完成';
  } else if (value === '2') {
    return '已作废';
  } else {
    return '';
  }
});

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App
});
app.$mount();
