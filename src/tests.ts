const ui = document.getElementById("vitest-ui")!;

beforeEach(() => {
  document.body.style.paddingBlock = "100vh";
  document.body.style.paddingInline = "100vw";
  document.body.removeChild(ui);
  document.documentElement.style.overflow = "auto";
});

afterEach(() => {
  document.body.style.paddingInline = "none";
  document.body.style.paddingBlock = "none";
  document.body.prepend(ui);
  document.documentElement.style.overflow = "hidden";
});
