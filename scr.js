function containsAll(elements, elementsToCheck, strict) {
  if (strict && elements.length !== elementsToCheck.length) {
    return false;
  }

  for (let e of elementsToCheck) {
    if (!elements.contains(e)) {
      return false;
    }
  }

  return true;
}

function findParentByClasses(node, classes) {
  let parent = node.parentNode;

  // noinspection MagicNumberJS
  for (let i = 0; i < 20 && parent != null; i++) {
    let classList = parent.classList;

    if (classList != null && containsAll(classList, classes)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return null;
}

let debug = false;

chrome.storage.local.get({
  'cprDebug': false
}, settings => {
  if (chrome.runtime.lastError) {
    debug = true;
  } else {
    debug = settings['cprDebug'];
  }
});

const mutationObserver = new MutationObserver(() => {
  for (let wrapper of document.querySelectorAll('div.userContentWrapper')) {
    if (wrapper.firstChild.textContent.search(/corona[ ]?virus/i) >= 0) {
      let toRemove = findParentByClasses(wrapper, ['_5va1', '_427x'], true);

      if (toRemove == null) {
        toRemove = findParentByClasses(wrapper, ['_4-u2', '_4-u8'], false);
      }

      if (debug) {
        toRemove.style.border = '4px solid green';
      } else {
        toRemove.parentElement.removeChild(toRemove);
      }
    }
  }
});

mutationObserver.observe(document, {subtree: true, childList: true});
