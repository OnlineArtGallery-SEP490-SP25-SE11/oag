import { exec } from "child_process";
import fs from "fs";
import path from "path";
import print_text from "./print";
import ProgressBarManager from "./progress-bar";

interface Repository {
  name: string;
  url: string;
  branch: string;
  postCloneCommands?: string[];
}

const repositories: Repository[] = [
  {
    name: "api",
    url: "https://github.com/OnlineArtGallery-SEP490-SP25-SE11/OAG-BE.git",
    branch: "master",
    postCloneCommands: ['echo ".env" > api/.env'],
  },
  {
    name: "client",
    url: "https://github.com/OnlineArtGallery-SEP490-SP25-SE11/OAG-FE.git",
    branch: "master",
    postCloneCommands: ['echo ".env.local" > client/.env.local'],
  },
  {
    name: "client-admin",
    url: "https://github.com/OnlineArtGallery-SEP490-SP25-SE11/OAG-FE-ADMIN.git",
    branch: "master",
    postCloneCommands: ['echo ".env.local" > client-admin/.env.local'],
  },
];
const progressManager = new ProgressBarManager(repositories.length);

const createEnvFile = (filePath: string, content: string = "") => {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
const runCommand = async (command: string, cwd: string) => {
  return new Promise<void>((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        print_text(`Error running command "${command}":`, "red", "bold");
        reject(error);
        return;
      }
      print_text(`Command "${command}" executed successfully`, "green", "bold");
      resolve();
    });
  });
};

const cloneRepository = async (repo: Repository, index: number) => {
  const repoPath = path.resolve(process.cwd(), repo.name);
  progressManager.updateProgress(index, `Processing ${repo.name}...`);
  if (!fs.existsSync(repoPath)) {
    try {
      fs.mkdirSync(repoPath, { recursive: true });
    } catch (error) {
      print_text(`Failed to create directory ${repoPath}`, "red", "bold");
      return;
    }
  }
  try {
    await fs.promises.access(repoPath, fs.constants.W_OK);
  } catch (error) {
    print_text(`No write permission for ${repoPath}`, "red", "bold");
    return;
  }

  const command = `git clone -b ${repo.branch} ${repo.url} ${repo.name}`;
  print_text(
    `Cloning ${repo.name} from branch ${repo.branch}...`,
    "cyan",
    "reset"
  );

  try {
    await runCommand(command, process.cwd());
    print_text(`Successfully cloned ${repo.name}`, "green", "bold");
    if (fs.existsSync(repoPath)) {
      if (repo.name === "api") {
        const envPath = path.join(repoPath, ".env");
        await createEnvFile(envPath);
        print_text(`Created ${envPath} successfully`, "green", "bold");
      } else {
        const envPath = path.join(repoPath, ".env.local");
        await createEnvFile(envPath);
        print_text(`Created ${envPath} successfully`, "green", "bold");
      }
      progressManager.updateProgress(index + 1, `Completed ${repo.name}`);
    } else {
      throw new Error(
        `Repository folder ${repoPath} does not exist after cloning`
      );
    }
  } catch (error) {
    print_text(`Failed to process ${repo.name}: ${error}`, "red", "bold");
    progressManager.updateProgress(index, `Failed ${repo.name}`);
  }
};
const cloneAll = async () => {
  try {
    for (let i = 0; i < repositories.length; i++) {
      await cloneRepository(repositories[i], i);
    }
    print_text("All repositories have been processed", "green", "bold");
  } catch (error) {
    print_text("Failed to process all repositories", "red", "bold");
  } finally {
    progressManager.stop();
  }
};
cloneAll();
