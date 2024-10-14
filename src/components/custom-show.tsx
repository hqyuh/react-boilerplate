import { TFCC } from '@/@types/fcc';

export const CustomShow: TFCC<{ when?: boolean }> = (props) => {
  return <>{props.when ? <>{props.children}</> : null}</>;
};
