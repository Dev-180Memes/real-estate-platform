import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { FaBed, FaBath } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { IProperty } from '@/models/Property.model';

const Property = ({property} : any) => (
    <Link href={`/property/${property._id}`} passHref>
      <Flex flexWrap='wrap' w='420px' p='5' paddingTop='0px' justifyContent='flex-start' cursor='pointer' >
        <Box>
          <Image src={property.images} width={400} height={260} alt='' />
        </Box>
        <Box w='full'>
          <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <Box paddingRight='3' color='green.400'><GoVerified /></Box>
              <Text fontWeight='bold' fontSize='lg'>Naira {property.price} {property.listType === 'rent' ? 'Per Rent' : 'For Sale'}</Text>
            </Flex>
          </Flex>
          <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
            {property.bedrooms} <FaBed /> | {property.bathrooms} <FaBath />
          </Flex>
          <Text fontSize='lg'>
            {property.propertyTitle.length > 30 ? property.propertyTitle.substring(0, 30) + '...' : property.propertyTitle}
          </Text>
        </Box>
      </Flex>
    </Link>
  );

export default Property
