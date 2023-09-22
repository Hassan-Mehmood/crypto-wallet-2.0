import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinHoldingQuantity, getCoinMarketData } from '../../api/axios';
import { removeCoin } from '../../slices/coinSlice';

interface IEditTransactionModal {
  isOpen: boolean;
  onClose: () => void;
  transactionID: number;
}
export const EditTransactionModal = ({ isOpen, onClose, transactionID }: IEditTransactionModal) => {
  const { colorMode } = useColorMode();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [pricePerCoin, setPricePerCoin] = useState('0');
  const [coinQuantity, setCoinQuantity] = useState('0');
  const [coinHoldingQuantity, setCoinHoldingQuantity] = useState(0);
  const [transactionDate, setTransactionDate] = useState('');

  const coinData = useSelector((state: RootState) => state.searchCoinReducer);
  const dispatch = useDispatch();

  //  console.log('Coin data', coinData);

  useEffect(() => {
    if (!isOpen) {
      dispatch(removeCoin());
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (isOpen) {
      let isMounted = true;

      if (!coinData?.id) {
        setPricePerCoin('0');
        return;
      }

      if (!isMounted) return;
      getCoinMarketData(coinData.id).then((res) => {
        const marketData = res.market_data;

        if (!marketData) return;
        setPricePerCoin(marketData.current_price?.usd.toString() || '0');
      });

      if (!isMounted) return;
      getCoinHoldingQuantity(coinData.id).then((res) => {
        const quantity = res.holdingsInPortfolio;

        setCoinHoldingQuantity(quantity);
      });
    }

    return () => {
      // isMounted = false;
      // dispatch(removeCoin());
      // console.log('Clean up Transaction Modal');
    };
  }, [coinData.id, dispatch, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width={'25.6rem'} position={'relative'}>
        <ModalHeader textAlign={'center'}>Edit Transaction</ModalHeader>
        <ModalCloseButton position={'absolute'} right={'0.8rem'} top={'1.1rem'} />
        <ModalBody>
          <Tabs position="relative" isFitted variant="unstyled">
            <TabList>
              <Tab>Buy</Tab>
              <Tab>Sell</Tab>
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
            <TabPanels>
              <TabPanel>
                {/* BUY */}
                <form onSubmit={() => ''}>
                  <FormControl mt={'1rem'}>
                    <FormLabel>Price per coin</FormLabel>
                    <Input value={pricePerCoin} onChange={(e) => setPricePerCoin(e.target.value)} />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Quantity</FormLabel>
                    <Input value={coinQuantity} onChange={(e) => setCoinQuantity(e.target.value)} />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Total Spent (USD)</FormLabel>
                    <Input
                      value={parseFloat(pricePerCoin) * parseFloat(coinQuantity) || '0'}
                      readOnly
                    />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Date</FormLabel>
                    <Input
                      placeholder="Select Date and Time"
                      type="date"
                      onChange={(e) => setTransactionDate(e.target.value)}
                    />
                  </FormControl>

                  <Button
                    // onClick={(e) => buyTransaction(e)}
                    isLoading={loadingBtn}
                    type="submit"
                    fontSize="md"
                    borderRadius="0.3rem"
                    color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
                    backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
                    border={`1px solid ${colorMode === 'light' ? '#8bc53f' : '#0facf0'}`}
                    margin="1rem 0.5rem 0 0"
                    padding="0.5rem 1.5rem"
                    width="100%"
                    _hover={{
                      background: 'none',
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </TabPanel>
              <TabPanel>
                {/* SELL */}
                <form onSubmit={() => ''}>
                  <FormControl mt={'1rem'}>
                    <FormLabel>Price per coin</FormLabel>
                    <Input value={pricePerCoin} onChange={(e) => setPricePerCoin(e.target.value)} />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Quantity</FormLabel>
                    <Input value={coinQuantity} onChange={(e) => setCoinQuantity(e.target.value)} />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <Flex justify="space-between" alignItems="center">
                      <FormLabel display="inline-block">Total Recieved (USD)</FormLabel>
                      <Text as="span" display="inline-block" mb="8px">
                        Balance: {coinHoldingQuantity || '0'} {coinData.symbol}
                      </Text>
                    </Flex>
                    <Input
                      value={parseFloat(pricePerCoin) * parseFloat(coinQuantity) || '0'}
                      readOnly
                    />
                  </FormControl>
                  <FormControl mt={'1.5rem'}>
                    <FormLabel>Date</FormLabel>
                    <Input
                      placeholder="Select Date and Time"
                      type="date"
                      onChange={(e) => setTransactionDate(e.target.value)}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    isLoading={loadingBtn}
                    fontSize="md"
                    borderRadius="0.3rem"
                    color={colorMode === 'light' ? '#8bc53f' : '#0facf0'}
                    backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
                    border={`1px solid ${colorMode === 'light' ? '#8bc53f' : '#0facf0'}`}
                    margin="1rem 0.5rem 0 0"
                    padding="0.5rem 1.5rem"
                    width="100%"
                    _hover={{
                      background: 'none',
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
