export const Logo = (props: { isMobile: boolean }) => {
  return <img src="/kakehashi-dm-logo.svg" height={props.isMobile ? 25 : 50} />;
};
