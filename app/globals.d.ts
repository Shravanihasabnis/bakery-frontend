declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const styles: { [key: string]: string };
  export = styles;
}
