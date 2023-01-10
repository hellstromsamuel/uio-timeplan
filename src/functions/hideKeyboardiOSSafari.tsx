export function hideKeyboardiOSSafari() {
  (document.activeElement as HTMLElement).blur();
  document.body.focus();
}
