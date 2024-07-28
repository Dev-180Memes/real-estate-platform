import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Image,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { FaSearch, FaList, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

const Home = () => {
  return (
    <Box as="main" bg="gray.50" minH="100vh" py={10}>
      <Container maxW="container.lg">
        <Stack direction={{ base: 'column', md: 'row' }} spacing={10} align="center" justify="center">
          <Box flex="1">
            <Heading as="h1" size="2xl" mb={4}>
              Discover Your Dream Home
            </Heading>
            <Text fontSize="lg" color="gray.700" mb={6}>
              Find the perfect property with our unique neighborhood insights. Explore schools, hospitals, and other amenities around your future home.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
              <Link href="/search" passHref>
                <Button colorScheme="blue" size="lg">
                  Search Properties
                </Button>
              </Link>
              <Link href="/list" passHref>
                <Button colorScheme="blue" size="lg" variant="outline">
                  List Your Property
                </Button>
              </Link>
            </Stack>
          </Box>
          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <Image
              src="/house.jpg" // Replace with your image URL
              alt="Real Estate"
              borderRadius="lg"
              boxShadow="md"
            />
          </Box>
        </Stack>

        {/* Features Section */}
        <Box mt={16}>
          <Heading as="h2" size="xl" textAlign="center" mb={8}>
            Why Choose Us
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <VStack align="start">
              <Icon as={FaSearch} w={10} h={10} color="blue.500" />
              <Heading as="h3" size="md">Comprehensive Search</Heading>
              <Text color="gray.600">Easily search for properties with detailed insights into neighborhood amenities.</Text>
            </VStack>
            <VStack align="start">
              <Icon as={FaList} w={10} h={10} color="blue.500" />
              <Heading as="h3" size="md">List Your Property</Heading>
              <Text color="gray.600">List your property with us and reach a large audience of potential buyers or renters.</Text>
            </VStack>
            <VStack align="start">
              <Icon as={FaMapMarkerAlt} w={10} h={10} color="blue.500" />
              <Heading as="h3" size="md">Neighborhood Insights</Heading>
              <Text color="gray.600">Get detailed information about the neighborhood, including schools, hospitals, and more.</Text>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Testimonials Section */}
        <Box mt={16}>
          <Heading as="h2" size="xl" textAlign="center" mb={8}>
            What Our Users Say
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box bg="white" p={6} rounded="md" shadow="md">
              <Text color="gray.600" mb={4}>
                "This platform made finding my dream home so easy! The neighborhood insights were incredibly helpful in making my decision."
              </Text>
              <HStack>
                <Image
                  src="/house.jpg" // Replace with your image URL
                  alt="User Testimonial"
                  borderRadius="full"
                  boxSize="50px"
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">John Doe</Text>
                  <Text fontSize="sm" color="gray.500">Home Buyer</Text>
                </VStack>
              </HStack>
            </Box>
            <Box bg="white" p={6} rounded="md" shadow="md">
              <Text color="gray.600" mb={4}>
                "Listing my property was a breeze. The platform's user-friendly interface and large audience made the process smooth and efficient."
              </Text>
              <HStack>
                <Image
                  src="/house.jpg" // Replace with your image URL
                  alt="User Testimonial"
                  borderRadius="full"
                  boxSize="50px"
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">Jane Smith</Text>
                  <Text fontSize="sm" color="gray.500">Property Owner</Text>
                </VStack>
              </HStack>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Footer Section */}
        <Divider my={16} />
        <Box as="footer" textAlign="center" py={8}>
          <Text color="gray.600" mb={4}>© 2024 Realtor. All rights reserved.</Text>
          <HStack spacing={8} justify="center">
            <Link href="/about" passHref>About Us
            </Link>
            <Link href="/contact" passHref>
              Contact
            </Link>
            <Link href="/terms" passHref>
              Terms of Service
            </Link>
            <Link href="/privacy" passHref>
              Privacy Policy
            </Link>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
