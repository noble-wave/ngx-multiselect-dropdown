import {
  Directive,
  ElementRef,
  output,
  inject,
  effect,
  DestroyRef,
} from '@angular/core';

/**
 * Directive that emits an event when a click occurs outside the host element.
 * Useful for closing dropdowns, modals, and other overlays.
 *
 * @example
 * ```html
 * <div (clickOutside)="closeDropdown()">
 *   Dropdown content
 * </div>
 * ```
 */
@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly clickOutside = output<MouseEvent>();

  constructor() {
    // Use effect to set up the listener after view initialization
    effect((onCleanup) => {
      const handleClick = (event: MouseEvent) => {
        const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);
        if (!clickedInside) {
          this.clickOutside.emit(event);
        }
      };

      // Add listener with a small delay to avoid immediate triggering
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClick, true);
      }, 0);

      // Cleanup
      onCleanup(() => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClick, true);
      });
    });
  }

  // TODO: Add unit tests for click outside detection
  // TODO: Consider touch events for mobile support
}
