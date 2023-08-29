import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Code,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  chakra,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import hljsStyleGitHub from 'react-syntax-highlighter/dist/esm/styles/hljs/github';

import PowerShellAdbDumpCommandTemplate from './adb_dump.ps1?raw';
import ShellAdbDumpCommandTemplate from './adb_dump.sh?raw';

const applyTemplate = (tpl: string, values: Record<string, unknown>) => {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => (Object.hasOwn(values, key) ? String(values[key]) : '<nil>'));
};

export interface AndroidADBPullInstructionProps {
  dir: string;
  file: string;
}

export function AndroidADBPullInstruction({ dir, file }: AndroidADBPullInstructionProps) {
  const psAdbDumpCommand = applyTemplate(PowerShellAdbDumpCommandTemplate, { dir, file });
  const shAdbDumpCommand = applyTemplate(ShellAdbDumpCommandTemplate, { dir, file });

  return (
    <>
      <Text>
        你需要 <code>root</code> 访问权限来访问安卓应用的私有数据。
      </Text>
      <Text>
        ⚠️ 请注意，获取 <code>root</code> 通常意味着你的安卓设备
        <chakra.span color="red.400">将失去保修资格</chakra.span>。
      </Text>

      <Accordion allowToggle mt="2">
        <AccordionItem>
          <Heading as="h3" size="md">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                在安卓手机端操作
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <OrderedList>
              <ListItem>
                <Text>
                  启动具有 <Code>root</Code> 特权的文件浏览器
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  访问 <Code>{dir}/</Code> 目录。
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  将文件 <Code>{file}</Code> 复制到浏览器可访问的目录。
                  <br />
                  （例如下载目录）
                </Text>
              </ListItem>
              <ListItem>
                <Text>提交该数据库文件。</Text>
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Heading as="h3" size="md">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                在 PC 端操作（ADB / PowerShell）
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <OrderedList>
              <ListItem>
                <Text>
                  确保 <code>adb</code> 命令可用。
                </Text>
                <Text>
                  💡 如果没有，可以
                  <Link href="https://scoop.sh/#/apps?q=adb" isExternal>
                    使用 Scoop 安装 <ExternalLinkIcon />
                  </Link>
                  。
                </Text>
              </ListItem>
              <ListItem>
                <Text>启动终端并进入 PowerShell 7 环境。</Text>
              </ListItem>
              <ListItem>
                <Text>将安卓设备连接到电脑，并允许调试。</Text>
              </ListItem>
              <ListItem>
                <Text>粘贴执行下述代码。若设备提示「超级用户请求」请允许：</Text>
                <SyntaxHighlighter language="ps1" style={hljsStyleGitHub}>
                  {psAdbDumpCommand}
                </SyntaxHighlighter>
              </ListItem>
              <ListItem>
                <Text>
                  提交当前目录下的 <Code>{file}</Code> 文件。
                </Text>
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Heading as="h3" size="md">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                在 Linux / Mac 系统下操作（ADB / Shell）
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <OrderedList>
              <ListItem>
                <Text>将安卓设备连接到电脑，并允许调试。</Text>
              </ListItem>
              <ListItem>
                <Text>粘贴执行下述代码。若设备提示「超级用户请求」请允许：</Text>
                <SyntaxHighlighter language="bash" style={hljsStyleGitHub}>
                  {shAdbDumpCommand}
                </SyntaxHighlighter>
              </ListItem>
              <ListItem>
                <Text>
                  提交当前目录下的 <Code>{file}</Code> 文件。
                </Text>
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
