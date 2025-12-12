import { decryptText } from 'lib/utils/decryptText';
import type { NextApiRequest, NextApiResponse } from 'next';

// biome-ignore lint/suspicious/useAwait: -
const decrypt = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { text },
  } = req;

  const decryptedText = decryptText(text as string);

  res.status(200);
  res.json(decryptedText);
};

export default decrypt;
