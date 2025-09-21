// 代码生成时间: 2025-09-22 01:12:07
import { ensureDir, existsSync, readDirSync, removeSync, writeFileSync } from 'https://deno.land/std/fs/mod.ts';
import { decode, encode, Image } from 'https://deno.land/x/oicod/mod.ts';
import { join } from 'https://deno.land/std/path/mod.ts';

// 图片尺寸批量调整器
class ImageResizer {
  private sourceDir: string;
  private targetDir: string;
  private width: number;
  private height: number;

  constructor(sourceDir: string, targetDir: string, width: number, height: number) {
    this.sourceDir = sourceDir;
    this.targetDir = targetDir;
    this.width = width;
    this.height = height;
  }

  // 调整图片尺寸
  public async resizeImages(): Promise<void> {
    try {
      await ensureDir(this.targetDir); // 确保目标目录存在
      const files = readDirSync(this.sourceDir); // 读取源目录中的文件

      for (const file of files) {
        if (file.isFile) {
          const filePath = join(this.sourceDir, file.name);
          const image = await decode(filePath); // 解码图片
          const resizedImage = new Image(this.width, this.height, image.data); // 创建新尺寸的图片

          const targetFilePath = join(this.targetDir, file.name);
          await Deno.writeFile(targetFilePath, encode(resizedImage)); // 编码并保存新图片
        }
      }
    } catch (error) {
      console.error('Error resizing images:', error);
    }
  }
}

// 使用示例
const sourceDir = './source';
const targetDir = './target';
const width = 800;
const height = 600;

const resizer = new ImageResizer(sourceDir, targetDir, width, height);
resizer.resizeImages().then(() => {
  console.log('Images resized successfully');
});