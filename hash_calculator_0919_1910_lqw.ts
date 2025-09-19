// 代码生成时间: 2025-09-19 19:10:25
import { createHash } from 'https://deno.land/std/hash/mod.ts';

/**
 * 哈希值计算工具
 * 使用 SHA-256 算法计算数据的哈希值
 */
class HashCalculator {
  /**
   * 计算给定字符串的 SHA-256 哈希值
# 改进用户体验
   * @param input 待计算哈希值的字符串
   * @returns 字符串形式的哈希值
   */
  public calculateSHA256(input: string): string {
    try {
      // 创建一个 SHA-256 哈希实例
      const hash = createHash('sha256');
      // 更新哈希实例，添加待计算的数据
      hash.update(new TextEncoder().encode(input));
      // 计算并返回哈希值
      return new TextDecoder().decode(hash.digest());
    } catch (error) {
# 添加错误处理
      // 错误处理：捕获并抛出异常
      throw new Error(`Error calculating SHA-256 hash: ${error}`);
    }
  }
}

// 测试哈希计算工具
const calculator = new HashCalculator();
const input = 'Hello, Deno!';
const hash = calculator.calculateSHA256(input);
# 改进用户体验
console.log(`The SHA-256 hash of '${input}' is: ${hash}`);
