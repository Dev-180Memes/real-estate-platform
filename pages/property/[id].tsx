import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { IProperty } from '@/models/Property.model';
import EmbedSite from '@/components/EnbedSite';

const Property = () => {
    const [property, setProperty] = useState<IProperty | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchProperty = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/property/${id}`);
                    const data = await response.json();
                    setProperty(data.data);
                } catch (error) {
                    toast.error('Error fetching property');
                }
            }
        };

        fetchProperty();
    }, [id]);

    if (!property) {
        return null
    }

  return (
    <Box maxWidth={'1000px'} margin={'auto'} p={'4'}>
        <Image 
            src={property.images}
            width={1000}
            height={500}
            alt={property.propertyTitle}
        />
        <Box w={'full'} p='6'>
            <Flex paddingTop='2' alignItems='center'>
                <Box paddingRight='3' color='green.400'><GoVerified /></Box>
                <Text fontWeight='bold' fontSize='lg'>
                    NGN {property.price} {property.listType === 'rent' ? 'Per Rent' : 'For Sale'}
                </Text>
                <Spacer />
            </Flex>
        </Box>

        <Box p='6'>
            <Text fontSize='xl' fontWeight='bold'>{property.propertyTitle}</Text>
            <Text>{property.streetAddress}</Text>
            <Text>{property.localGovernment}</Text>
        </Box>

        <Box p='6'>
            <Text fontSize='xl' fontWeight='bold'>Description</Text>
            <Text>{property.description}</Text>
        </Box>

        <Box p='6'>
            <Text fontSize='xl' fontWeight='bold'>Features</Text>
            <Flex paddingTop='2' alignItems='center'>
                <Box paddingRight='3' color='green.400'><FaBed /></Box>
                <Text>{property.bedrooms} Bedrooms</Text>
                <Spacer />
                <Box paddingRight='3' color='green.400'><FaBath /></Box>
                <Text>{property.bathrooms} Bathrooms</Text>
            </Flex>
        </Box>

        {/* // Neighborhood Insights */}
        <Box p='6'>
            <Text fontSize='xl' fontWeight='bold'>Neighborhood Insights with Google Maps</Text>
            <Spacer />
            <Text fontSize='md' fontWeight='bold'>Hospitals</Text>
            <EmbedSite
            query={`hosiptals in ${property.localGovernment}`} 
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
            center={{ lat: 37.7749, lng: -122.4194 }}
            />

            <Text fontSize='md' fontWeight='bold'>Schools</Text>
            <EmbedSite
                query={`schools in ${property.localGovernment}`}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
                center={{ lat: 37.7749, lng: -122.4194 }}
            />

            <Text fontSize='md' fontWeight='bold'>Schools</Text>
            <EmbedSite
                query={`restaurants in ${property.localGovernment}`}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
                center={{ lat: 37.7749, lng: -122.4194 }}
            />

            <Text fontSize='md' fontWeight='bold'>Police Stations</Text>
            <EmbedSite
                query={`police stations in ${property.localGovernment}`}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
                center={{ lat: 37.7749, lng: -122.4194 }}
            />
        </Box>
    </Box>
  )
}

export default Property
