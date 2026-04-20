import { Box, Button, Typography } from '@mui/material';
import { FaBrain } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa6";
import { FaCloud } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { FaShieldHalved } from "react-icons/fa6";
import { FaServer } from "react-icons/fa6";
import { SiRelay } from "react-icons/si";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { FaBuilding } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { BsBuildingsFill } from "react-icons/bs";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoChatbubbles } from "react-icons/io5";
import { BsStack } from "react-icons/bs";
import { FaMessage } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { FaPuzzlePiece } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";






const CNIntro = () => {
    return (
        <>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={3}>
                <Typography variant='h4' fontWeight={600}>Introduction to Computer Networks</Typography>
                <Typography variant='body1' color='text.secondary'>
                    <h3>Understand how devices communicate and share data across the world</h3>
                </Typography>
            </Box>


            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    padding: 3,
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: 1,
                    height: "350px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Box>
                    <Typography variant='h5' color='text.primary' fontWeight={600} mb={2} display={'flex'} alignItems={'center'} gap={2}>
                        <Box
                            sx={{
                                backgroundColor: '#4a90e2', // light purple background
                                borderRadius: '25%',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FaBrain size="20px" color="#ffffff" /> {/* icon color purple */}
                        </Box>
                        What is Computer Networking?
                    </Typography>

                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3}>
                        <Box width={'47%'}>
                            <Typography variant='body1' color='text.secondary'>Computer networking is the practice of connecting computers and devices to enable them to communicate and share resources like data, files, applications, and internet access. Networks form the backbone of modern digital communication.</Typography>
                            <Box backgroundColor='#ffffff' height={'80%'} width={'95%'} borderRadius={3} p={1.5} mt={1}>
                                <Typography variant='h6' mb={1}>Network Examples in Daily Life :</Typography>
                                <Typography display={'flex'} alignItems={'center'} gap={1}><TbWorld color='#4b92e3' size={'20px'} />Internet - Global network of networks</Typography>
                                <Typography display={'flex'} alignItems={'center'} gap={1}><FaBuilding color='#4b92e3' size={'20px'} />LAN - Local Area Network in offices</Typography>
                                <Typography display={'flex'} alignItems={'center'} gap={1}><FaWifi color='#4b92e3' size={'20px'} />Wi-Fi - Wireless local networks</Typography>
                                <Typography display={'flex'} alignItems={'center'} gap={1}><FaServer color='#4b92e3' size={'20px'} />Client-Server - Web applications</Typography>
                            </Box>
                        </Box>

                        <Box width={'47%'}>
                            <Typography variant='h6'>Popular Operating Systems:</Typography>
                            <Box p={1.5} mt={1}>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#e8f2ff'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <AiFillHome size={'25px'} color='#4a90e2' />
                                        <Typography>PAN</Typography>
                                        <Typography variant='body1' fontSize='13px' color='text.secondary'>Personal Area</Typography>
                                    </Box>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#f3f4f6'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <FaBuilding color='#355873' size={'30px'} />
                                        <Typography>LAN</Typography>
                                        <Typography variant='body1' fontSize='13px' color='text.secondary'>Local Area</Typography>
                                    </Box>
                                </Box>

                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={2}>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#f3f4f6'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <BsBuildingsFill color='#f70000' size={'25px'} />
                                        <Typography>MAN</Typography>
                                        <Typography variant='body1' fontSize='13px' color='text.secondary'>Metropolitan</Typography>
                                    </Box>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#f0fdf4'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <FaEarthAmericas color='#16a34a' size={'30px'} />
                                        <Typography>WAN</Typography>
                                        <Typography variant='body1' fontSize='13px' color='text.secondary'>Wide Area</Typography>
                                    </Box>
                                </Box>


                            </Box>
                        </Box>
                    </Box>


                </Box>
            </Box>


            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    padding: 3,
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: 1,
                    height: "280px",
                    maxWidth: "1210px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Typography variant='h5' color='text.primary' fontWeight={600} mb={2} display={'flex'} alignItems={'center'} gap={2}>
                    <Box
                        sx={{
                            backgroundColor: '#22c55e', // light purple background
                            borderRadius: '25%',
                            padding: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FaRocket size="20px" color="#ffffff" /> {/* icon color purple */}
                    </Box>
                    Why Learn Computer Networks?
                </Typography>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={6} mt={5}>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
                        <Box
                            sx={{
                                backgroundColor: '#e8f2ff', // light purple background
                                borderRadius: '50%',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <IoChatbubbles size="30px" color="#4a90e2" /> {/* icon color purple */}
                        </Box>
                        <Typography variant='h7' fontWeight={500} mt={3}>System Communication</Typography>
                        <Typography variant='body1' color='text.secondary' mt={1.5}>Essential for understanding how modern systems communicate and interact</Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
                        <Box
                            sx={{
                                backgroundColor: '#e6e0ff', // light purple background
                                borderRadius: '50%',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FaShieldHalved size="30px" color="#9333ea" /> {/* icon color purple */}
                        </Box>
                        <Typography variant='h7' fontWeight={500} mt={3}>Modern Tech Foundation</Typography>
                        <Typography variant='body1' color='text.secondary' mt={1.5}>Basis of web applications, cloud computing, mobile apps, and distributed systems</Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
                        <Box
                            sx={{
                                backgroundColor: '#ffedd5', // light purple background
                                borderRadius: '50%',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FaCloud size="30px" color="#f97316" /> {/* icon color purple */}
                        </Box>
                        <Typography variant='h7' fontWeight={500} mt={3}>Career Applications</Typography>
                        <Typography variant='body1' color='text.secondary' mt={1.5}>Critical for backend development, cybersecurity, and system design roles</Typography>
                    </Box>
                </Box>


            </Box>



            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    padding: 3,
                    mb: 5,
                    borderRadius: 2,
                    boxShadow: 1,
                    height: "380px",
                    maxWidth: "1210px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Typography variant='h5' color='text.primary' fontWeight={600} mb={2} display={'flex'} alignItems={'center'} gap={2}>
                    <Box
                        sx={{
                            backgroundColor: '#a855f7', // light purple background
                            borderRadius: '25%',
                            padding: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FaGraduationCap size="20px" color="#ffffff" /> {/* icon color purple */}
                    </Box>
                    Key Topics in Computer Networks Lab
                </Typography>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={4} mt={3}>
                    <Box width={'100%'} height={'80px'} bgcolor={'#e8f2ff'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <BsStack size={'25px'} color='#4a90e2' />
                            <Typography variant='body1' fontWeight={500}>OSI & TCP/IP Models</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Understand the 7-layer OSI model and 4-layer TCP/IP stack for network communication</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#f0fdf4'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaArrowRightArrowLeft size={'25px'} color='#16a34a' />
                            <Typography variant='body1' fontWeight={500}>Transmission Modes</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Learn Simplex, Half-Duplex, and Full-Duplex communication patterns</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#fff7ed'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaMessage size={'25px'} color='#f67216' />
                            <Typography variant='body1' fontWeight={500}>Network Protocols</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Master Stop-and-Wait, Go-Back-N, and Selective Repeat protocols</Typography>
                    </Box>


                </Box>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={4} mt={3}>
                    <Box width={'100%'} height={'80px'} bgcolor={'#faf5ff'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaWifi size={'25px'} color='#9333ea' />
                            <Typography variant='body1' fontWeight={500}>Network Security</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Learn encryption, authentication, and secure communication protocols</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#fef2f2'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <SiRelay size={'25px'} color='#4f46e5' />
                            <Typography variant='body1' fontWeight={500}>Routing Algorithms</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Study shortest path algorithms and congestion control mechanisms</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#eef2ff'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <MdError size={'25px'} color='#ef4444' />
                            <Typography variant='body1' fontWeight={500}>Error Detection</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Explore Parity bits, Checksums, and CRC for data integrity</Typography>
                    </Box>


                </Box>

            </Box>



            <Box
                sx={{
                    backgroundColor: "#3c81c9",
                    padding: 3,
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: 1,
                    height: "240px",
                    maxWidth: "1210px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <Typography variant='h5' color='#ffffff' fontWeight={600} mb={2} display={'flex'} alignItems={'center'} gap={2}>
                    <Box
                        sx={{
                            backgroundColor: '#6da5e6', // light purple background
                            borderRadius: '25%',
                            padding: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FaExclamation size="20px" color="#ffffff" /> {/* icon color purple */}
                    </Box>
                    Learning Goals & Interactive Features
                </Typography>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={4} mt={3}>
                    <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
                        <GoGraph size="30px" color="#ffffff" />
                        <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Data Flow Visualization</Typography>
                        <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>See how data packets travel across networks with animated simulations</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
                        <FaPlay size="30px" color="#ffffff" />
                        <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Protocol Simulations</Typography>
                        <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Interactive animations showing how different protocols handle data transmission</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
                        <FaPuzzlePiece size="30px" color="#ffffff" />
                        <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Real-World Analogies</Typography>
                        <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Understand complex concepts through everyday examples and metaphors</Typography>
                    </Box>


                </Box>

            </Box>

            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mt={6} mb={3}>
                <Button sx={{ textTransform: "none", p: 1.5, width: '30%', bgcolor: '#4a90e2', color: '#ffffff', borderRadius: 2.5, fontSize: '18px', display: 'flex', alignItems: 'center ', '&:hover': { bgcolor: '#367bbe' } }} onClick={''}><FaPlay style={{ marginRight: 5 }} />Start Learning - OSI Model</Button>
                <Typography variant='body1' color='text.secondary' mt={2}>Begin with understanding the 7-layer OSI reference model</Typography>
            </Box>



        </>
    );
}

export default CNIntro;
