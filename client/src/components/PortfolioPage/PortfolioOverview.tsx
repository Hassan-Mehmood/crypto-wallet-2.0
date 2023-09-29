import { Flex, useDisclosure } from '@chakra-ui/react';
import PortfolioSizeModal from './PortfolioSizeModal';
import PortfolioStats from './PortfolioStats';
import ManagePorftolio from './ManagePorftolio';

interface props {
  allTimeProfit: number | undefined;
  portfolioWorth: number | undefined;
  dollerBalance: number | undefined;
  cryptoBalance: number | undefined;
  bestPerformer:
    | {
        value: number;
        thump: string;
      }
    | undefined;
  worstPerformer:
    | {
        value: number;
        thump: string;
      }
    | undefined;
}

export default function PortfolioOverview({
  allTimeProfit,
  bestPerformer,
  worstPerformer,
  portfolioWorth,
  cryptoBalance,
  dollerBalance,
}: props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      flexDir={{ base: 'column', xl: 'row' }}
      px={{ xl: '2rem' }}
      mb={'4rem'}
    >
      <PortfolioSizeModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <PortfolioStats
        allTimeProfit={allTimeProfit}
        bestPerformer={bestPerformer}
        worstPerformer={worstPerformer}
        portfolioWorth={portfolioWorth}
        cryptoBalance={cryptoBalance}
        dollerBalance={dollerBalance}
      />

      <ManagePorftolio onOpen={onOpen} />
    </Flex>
  );
}
