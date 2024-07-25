import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';
import { IProperty } from '@/models/Property.model';
import toast from 'react-hot-toast';
import { filterData, getFilterValues } from '@/utils/filterData';
import noresult from '@/assets/images/noresult.svg';

const SearchFilters = ({ properties, setProperties } : any) => {
    const [locations, setLocations] = useState<string[]>([]);
    const [showLocations, setShowLocations] = useState<boolean>(false);
    const [filters] = useState<any>(filterData);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchLocations = async () => {
            const res = await fetch('/api/Filters/locations');

            const data = await res.json();

            if (res.ok) {
                setLocations(data.locations);
            } else {
                toast.error(data.error);
            }
        };

        fetchLocations();
    }, []);

    // Filter data based on search term
    useEffect(() => {
        if (searchTerm !== '') {
            setLoading(true);

            const filteredProperties = properties.filter((property: IProperty) => {
                return (
                    property.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    property.streetAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    property.localGovernment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    property.agentName.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });

            setProperties(filteredProperties);
            setLoading(false);
        } else {
            // Reset the properties state
            const fetchProperties = async () => {
                const res = await fetch('/api/list');

                const data = await res.json();

                if (res.ok) {
                    setProperties(data.properties);
                } else {
                    toast.error(data.error);
                }
            }

            fetchProperties();
        }
    }, [searchTerm]);

    const handleLocationChange = async (e: any) => {
        // Filter properties by location and update the properties state
        if (e.target.value === 'all') {
            const res = await fetch('/api/list');

            const data = await res.json();

            if (res.ok) {
                setProperties(data.properties);
            } else {
                toast.error(data.error);
            }
        } else {
            const res = await fetch('/api/list');

            const data = await res.json();

            if (res.ok) {
                setProperties(data.properties);
            } else {
                toast.error(data.error);
            }

            const filteredProperties = properties.filter((property: IProperty) => property.localGovernment === e.target.value);

            setProperties(filteredProperties);
        }
    }

    const handleListTypeChange = async (e: any) => {
        // Filter properties by list type and update the properties state
        if (e.target.value === 'all') {
            const res = await fetch('/api/list');

            const data = await res.json();

            if (res.ok) {
                setProperties(data.properties);
            } else {
                toast.error(data.error);
            }
        } else {
            const res = await fetch('/api/list');

            const data = await res.json();

            if (res.ok) {
                setProperties(data.properties);
            } else {
                toast.error(data.error);
            }

            const filteredProperties = properties.filter((property: IProperty) => property.listType === e.target.value);

            setProperties(filteredProperties);
        }
    }

    const handleMinPriceChange = async (e: any) => {
        if (e.target.value === 'all') {
            const res = await fetch('/api/list');

            const data = await res.json();

            if (res.ok) {
                setProperties(data.properties);
            } else {
                toast.error(data.error);
            }
        } else {
            const res = await fetch('/api/list');

            const data = await res.json();

            if (res.ok) {
                setProperties(data.properties);
            } else {
                toast.error(data.error);
            }

            const filteredProperties = properties.filter((property: IProperty) => property.price >= parseInt(e.target.value));

            setProperties(filteredProperties);
        }
    }

    const handleMaxPriceChange = async (e: any) => {
        if (e.target.value === 'all') {
            const res = await fetch('/api/list');

            const data = await res.json();

            if (res.ok) {
                setProperties(data.properties);
            } else {
                toast.error(data.error);
            }
        } else {
            const res = await fetch('/api/list');

            const data = await res.json();

            if (res.ok) {
                setProperties(data.properties);
            } else {
                toast.error(data.error);
            }

            const filteredProperties = properties.filter((property: IProperty) => property.price <= parseInt(e.target.value));

            setProperties(filteredProperties);
        }
    }

  return (
    <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
        {filters?.map((filter: any) => (
            <Box key={filter.queryName}>
                <Select 
                    onChange={(e) => {
                        if (filter.queryName === 'listType') {
                            handleListTypeChange(e);
                        } else if (filter.queryName === 'minPrice') {
                            handleMinPriceChange(e);
                        } else if (filter.queryName === 'maxPrice') {
                            handleMaxPriceChange(e);
                        }
                    }}
                    placeholder={filter.placeholder} 
                    w='fit-content' 
                    p='2' 
                >
                    <option value="all">All</option>
                    {filter?.items?.map((item: any) => (
                        <option value={item.value} key={item.value}>
                            {item.name}
                        </option>
                    ))}
                </Select>
            </Box>
        ))}
        <Flex flexDir={'column'}>
            <Button onClick={() => setShowLocations(!showLocations)} border='1px' borderColor='gray.200' marginTop='2' >
                Search Location
            </Button>
            {showLocations && (
                <Flex flexDir='column' pos='relative' paddingTop='2'>
                    <Input 
                        placeContent={'Type Here'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        w={'300px'}
                        focusBorderColor='gray.300'
                    />
                    {searchTerm !== '' && (
                        <Icon
                            as={MdCancel}
                            pos='absolute'
                            cursor='pointer'
                            right='5'
                            top='5'
                            zIndex='100'
                            onClick={() => setSearchTerm('')}
                        />
                    )}
                </Flex>
            )}
            {loading && <Spinner margin='auto' marginTop='3' />}
            {showLocations && (
                <Flex flexDir='column' pos='relative' paddingTop='2'>
                    <Select onChange={handleLocationChange} placeholder='Select Location' w='300px' focusBorderColor='gray.300'>
                        <option value='all'>All Locations</option>
                        {locations?.map((location) => (
                            <option value={location} key={location}>
                                {location}
                            </option>
                        ))}
                    </Select>
                </Flex>
            )}
        </Flex>
    </Flex>
  )
}

export default SearchFilters
