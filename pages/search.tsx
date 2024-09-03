import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon, Grid } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import { IProperty } from '@/models/Property.model';
import toast from 'react-hot-toast';
import Property from '@/components/Property';
import noresult from '@/assets/images/noresult.svg';
import SearchFilters from '@/components/SearchFilters';

const Search = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [searchFilters, setSearchFilters] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch('/api/list');

      const data = await res.json();

      if (res.ok) {
        setProperties(data.properties);
      } else {
        toast.error(data.error);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    if (router.query.listType) {
      const filteredProperties = properties.filter(
        (property) => property.listType === router.query.listType
      );

      setProperties(filteredProperties);
    }
  }, [router.query.listType]);

  return (
    <Box
      height={{ base: 'auto', md: '100vh' }}
      p="4"
    >
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft='2' w='7' as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters 
        properties={properties} 
        setProperties={setProperties}
      />}
      <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {router.query.purpose}
      </Text>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {properties.map((property) => <Property key={property.id} property={property} />)}
      </Grid>
      {properties.length === 0 && (
        <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' height='50vh'>
          <Image src={noresult} width={300} height={300} alt='No Result Found' />
          <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
        </Flex>
      )}
    </Box>
  )
}

export default Search;
