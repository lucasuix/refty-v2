export function setVisibility(frame, visible) {
    visible ? frame.classList.remove('d-none') : frame.classList.add('d-none');
}