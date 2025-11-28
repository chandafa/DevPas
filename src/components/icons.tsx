import Image from 'next/image';

export const Icons = {
  logo: (props: { className?: string }) => (
    <Image
      src="/logo.png"
      alt="DevPas Logo"
      width={32}
      height={32}
      className={props.className}
    />
  ),
};
