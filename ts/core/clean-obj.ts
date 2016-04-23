function isArray(obj): boolean {
  return obj && Array.isArray(obj);
}

function isObject(obj): boolean {
  return obj && typeof obj === 'object';
}

function hasNothing(obj): boolean {
  return typeof obj === 'undefined' || obj === '';
}

function removeProps(obj, key, parent): void {
  var i,
      value,
      isFullyEmpty = true;

  if (isArray(obj)) {
    for (i = 0; i < obj.length; ++i) {
      value = obj[i];

      if (isObject(value)) {
        isFullyEmpty = false;
        removeProps(value, i, obj);
      } else if (hasNothing(value)) {
        obj.splice(i--, 1);
      } else {
        isFullyEmpty = false;
      }
    }
  } else {
    for (i in obj) {
      value = obj[i];

      if (isObject(value)) {
        isFullyEmpty = false;
        removeProps(value, i, obj);
      } else if (hasNothing(value)) {
        delete obj[i];
      } else {
        isFullyEmpty = false;
      }
    }
  }

  if (typeof key !== 'undefined' && isFullyEmpty) {
    delete parent[key];
    removeProps(obj);
  }
}

module.exports = function(obj) {
  removeProps(obj);
  return obj;
};
