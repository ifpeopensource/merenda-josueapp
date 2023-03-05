import logomark from '../assets/josueapp-100.webp';

export function Header() {
  return (
    <>
      <div className="h-14 lg:h-16" />
      <header className="fixed top-0 w-full bg-primary-900 h-14 lg:h-16 flex items-center justify-center gap-1">
        <img
          src={logomark}
          alt="JosueApp"
          className="h-9 lg:h-11"
          draggable={false}
        />
        <span className="block text-neutral-50 text-lg lg:text-xl font-bold">
          JosueApp
        </span>
      </header>
    </>
  );
}
