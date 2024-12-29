import colors from "ansi-colors";
import cliProgress from "cli-progress";

class ProgressBarManager {
  private multiBar: cliProgress.MultiBar;
  private mainBar: cliProgress.SingleBar;
  private total: number;

  constructor(total: number) {
    this.total = total;
    this.multiBar = new cliProgress.MultiBar(
      {
        format:
          colors.cyan("{bar}") +
          " | {percentage}% | {value}/{total} Repositories | {status}",
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true,
        clearOnComplete: false,
      },
      cliProgress.Presets.shades_classic
    );

    this.mainBar = this.multiBar.create(total, 0, {
      status: "Starting...",
    });
  }

  updateProgress(index: number, status: string) {
    this.mainBar.update(index, { status });
  }

  incrementProgress(status: string) {
    this.mainBar.increment({ status });
  }

  stop() {
    this.multiBar.stop();
  }
}

export default ProgressBarManager;
