export interface DocumentProcessor {
  process(): void;

  processElement(element: HTMLElement): void;
}

export class StandardProcessor implements DocumentProcessor {
  constructor(private readonly document: Document) {}

  process(): void {
    const posts = this.document.querySelectorAll('div.userContentWrapper');

    for (const wrapper of posts) {
      if (wrapper.firstChild?.textContent?.search(/corona[ ]?virus/i) >= 0) {
        let toRemove = this.findParent(wrapper, ['_5va1', '_427x'], true);

        if (toRemove === null) {
          toRemove = this.findParent(wrapper, ['_4-u2', '_4-u8'], false);
          toRemove = this.findParent(toRemove, ['_4-u2', '_4-u8'], true) ?? toRemove;
        }

        this.processElement(toRemove);
      }
    }
  }

  processElement(element: HTMLElement): void {
    element.parentElement?.removeChild(element);
  }

  private findParent(
    node: Element,
    classes: readonly string[],
    strict = false
  ): HTMLElement | null {
    let parent = node.parentElement;

    for (let i = 0; i < 20 && parent !== null; i++) {
      if (this.containsAll(parent.classList, classes, strict)) {
        return parent;
      }

      parent = parent.parentElement;
    }

    return null;
  }

  private containsAll(
    elements: DOMTokenList,
    classesToCheck: readonly string[],
    strict = false
  ): boolean {
    if (strict && elements.length !== classesToCheck.length) {
      return false;
    }

    for (const c of classesToCheck) {
      if (!elements.contains(c)) {
        return false;
      }
    }

    return true;
  }
}

export class DebugProcessor extends StandardProcessor {
  processElement(element: HTMLElement): void {
    element.style.border = '3px solid green';
  }
}
