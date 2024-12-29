const colors: Record<string, string> = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
};

const styles: Record<string, string> = {
  bold: "\x1b[1m",
  underline: "\x1b[4m",
  reset: "\x1b[0m",
};

const print_text = (
  text: string,
  color: keyof typeof colors,
  style: keyof typeof styles
) => {
  const colorCode = colors[color] || colors.reset;
  const styleCode = styles[style] || styles.reset;
  console.log(`${styleCode}${colorCode}${text}${styles.reset}${colors.reset}`);
};

export default print_text;

// print_text("Bold and red text", "red", "bold");
// print_text("Underlined green text", "green", "underline");
