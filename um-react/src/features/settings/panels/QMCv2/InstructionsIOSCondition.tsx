import { Box, Code, Heading, Image, ListItem, OrderedList, Text } from '@chakra-ui/react';
import iosAllowBackup from './iosAllowBackup.webp';
import { FilePathBlock } from '~/components/FilePathBlock';

const EXAMPLE_MEDIA_ID = '0011wjLv1bIkvv';
const EXAMPLE_NAME_IOS = '333407709-0011wjLv1bIkvv-1.mgalaxy';
const EXAMPLE_NAME_DB = 'Q0M00011wjLv1bIkvv.mflac';

export function InstructionsIOSCondition({ jailbreak }: { jailbreak: boolean }) {
  const useJailbreak = jailbreak;
  const useBackup = !jailbreak;

  const pathPrefix = jailbreak ? '/var/mobile/Containers/Data/Application/<随机>/' : '/AppDomain-';

  return (
    <>
      <Heading as="h3" size="md">
        获取密钥数据库文件
      </Heading>
      <OrderedList>
        {useBackup && (
          <ListItem>
            <Text>首先需要在 iOS 客户端的设定允许备份：</Text>
            <Image src={iosAllowBackup}></Image>
          </ListItem>
        )}
        {useBackup && (
          <ListItem>
            <Text>使用你喜欢的备份软件对 iOS 设备进行完整备份；</Text>
          </ListItem>
        )}
        <ListItem>
          {useBackup && <Text>打开备份文件，并导航到下述目录：</Text>}
          {useJailbreak && <Text>访问下述目录：</Text>}
          <FilePathBlock>{pathPrefix}com.tencent.QQMusic/Documents/mmkv/</FilePathBlock>
        </ListItem>
        <ListItem>
          <Text>
            提取或导出密钥数据库文件 <Code>filenameEkeyMap</Code>；
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            提交导出的 <Code>filenameEkeyMap</Code> 文件；
          </Text>
        </ListItem>
        <ListItem>
          <Text>按下「保存」来应用更改。</Text>
        </ListItem>
      </OrderedList>

      <Heading as="h3" size="md" mt="3">
        获取离线文件
      </Heading>
      <Box>
        <Text>访问下述目录：</Text>
        <FilePathBlock>
          {pathPrefix}com.tencent.QQMusic/Library/Application Support/com.tencent.QQMusic/iData/iMusic
        </FilePathBlock>
        <Text>
          该目录又存在数个子目录，其子目录下保存的「<Code>[字符].m[字符]</Code>」文件则是最终的加密文件。
        </Text>
        <Text>
          格式：<Code>[song_id]-[mid]-[随机数字].m[后缀]</Code>
        </Text>
        <Text>
          &#x3000;例：<Code>{EXAMPLE_NAME_IOS}</Code>
        </Text>
      </Box>

      <Heading as="h3" size="md" mt="3">
        解密离线文件
      </Heading>
      <Text>勾选设定界面的「使用近似文件名匹配」可跳过该节内容。</Text>
      <Text>⚠ 注意：若密钥过多，匹配过程可能会造成浏览器卡顿或无响应。</Text>
      <OrderedList>
        <ListItem>
          <Text>
            提取文件的 <Code>[mid]</Code> 部分，如 <Code>{EXAMPLE_MEDIA_ID}</Code>；
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            查找密钥表，得到文件名「<Code>{EXAMPLE_NAME_DB}</Code>」；
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            将文件更名为对应的文件名，如<Code display="inline">{EXAMPLE_NAME_IOS}</Code> ➔
            <Code display="inline">{EXAMPLE_NAME_DB}</Code>；
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            回到主界面，提交文件「<Code>{EXAMPLE_NAME_DB}</Code>」。
          </Text>
        </ListItem>
      </OrderedList>
    </>
  );
}
