declare module '*.css' {
  export const content: { [className: string]: string };
  const styles: { [key: string]: string };
  export default styles;
}
