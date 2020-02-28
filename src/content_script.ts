import { getBrowserStorage } from './impl/browser_storage';
import {
  DebugProcessor,
  DocumentProcessor,
  StandardProcessor
} from './impl/document_processor';
import { map } from 'rxjs/operators';

function initMutationObserver(processor: DocumentProcessor): void {
  const mutationObserver = new MutationObserver(() => processor.process());
  mutationObserver.observe(document, {
    subtree: true,
    childList: true
  });
}

getBrowserStorage()
  .getValue('cprDebug', false)
  .pipe(
    map(debug => (debug ? DebugProcessor : StandardProcessor)),
    map(Processor => new Processor(document))
  )
  .subscribe(value => initMutationObserver(value));
