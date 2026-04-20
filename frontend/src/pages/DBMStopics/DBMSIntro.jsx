import { Box, Button, Typography } from '@mui/material';
import { FaBrain } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa6";
import { FaCloud } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { FaShieldHalved } from "react-icons/fa6";
import { FaTrophy } from "react-icons/fa6";
import { BiSolidBank } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import { FaDatabase } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaLeaf } from "react-icons/fa6";
// import { SiOracle } from "react-icons/si";
import { MdStorage } from "react-icons/md";
import { FaServer } from "react-icons/fa6";
import { SiRelay } from "react-icons/si";
import { FaCode } from "react-icons/fa6";
import { PiTreeStructureFill } from "react-icons/pi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FaTerminal } from "react-icons/fa6";



const DBMSIntro = () => {
    return (
        <>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={3}>
                <Typography variant='h4' fontWeight={600}>Introduction to Database Management Systems (DBMS)</Typography>
                <Typography variant='body1' color='text.secondary'>
                    <h3>Master data management and SQL through hands-on learning</h3>
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
                       What is a Database Management System?
                    </Typography>

                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3}>
                        <Box width={'47%'}>
                            <Typography variant='body1' color='text.secondary'>A Database Management System (DBMS) is software that enables users to define, create, maintain, and control access to databases. It provides a systematic way to store, retrieve, and manage data efficiently.</Typography>
                            <Box backgroundColor='#ffffff' height={'80%'} width={'95%'} borderRadius={3} p={1.5} mt={1}>
                                <Typography variant='h6' mb={1}>Real-Life Applications :</Typography>
                                <Typography display={'flex'} alignItems={'center'} gap={1}><BiSolidBank color='#4b92e3' size={'20px'}/>Banking & Financial Systems</Typography>
                                <Typography display={'flex'} alignItems={'center'} gap={1}><FaCartShopping color='#4b92e3' size={'20px'}/>E-commerce & Inventory</Typography>
                                <Typography display={'flex'} alignItems={'center'} gap={1}><FaGraduationCap color='#4b92e3' size={'20px'}/>School & University Records</Typography>
                                <Typography display={'flex'} alignItems={'center'} gap={1}><MdHealthAndSafety color='#4b92e3' size={'20px'}/>Healthcare Management</Typography>
                            </Box>
                        </Box>

                        <Box width={'47%'}>
                            <Typography variant='h6'>Popular Databases:</Typography>
                            <Box p={1.5} mt={1}>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#e8f2ff'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <FaDatabase size={'25px'} color='#4a90e2' />
                                        <Typography>MySQL</Typography>
                                    </Box>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#f3f4f6'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <BiLogoPostgresql color='#355873' size={'30px'} />
                                        <Typography>PostgreSQL</Typography>
                                    </Box>
                                </Box>

                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={2}>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#f3f4f6'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <MdStorage color='#f70000' size={'25px'} />
                                        <Typography>Oracle</Typography>
                                    </Box>
                                    <Box height={'90px'} width={'100%'} bgcolor={'#f0fdf4'} borderRadius={3} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <FaLeaf color='#16a34a' size={'30px'} />
                                        <Typography>MongoDB</Typography>
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
                    Why Study Database Management Systems?
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
                            <FaServer size="30px" color="#4a90e2" /> {/* icon color purple */}
                        </Box>
                        <Typography variant='h7' fontWeight={500} mt={3}>Backend Foundation</Typography>
                        <Typography variant='body1' color='text.secondary' mt={1.5}>Core of modern web applications and data storage systems</Typography>
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
                        <Typography variant='h7' fontWeight={500} mt={3}>Secure & Scalable</Typography>
                        <Typography variant='body1' color='text.secondary' mt={1.5}>Enables structured, secure, and scalable data access patterns</Typography>
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
                        <Typography variant='h7' fontWeight={500} mt={3}>Career Essential</Typography>
                        <Typography variant='body1' color='text.secondary' mt={1.5}>Key for full-stack development, data science, and cloud computing</Typography>
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
                    What You'll Learn in DBMS Lab
                </Typography>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={4} mt={3}>
                    <Box width={'100%'} height={'80px'} bgcolor={'#e8f2ff'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <SiRelay size={'25px'} color='#4a90e2' />
                            <Typography variant='body1' fontWeight={500}>Data Models & ER Diagrams</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Learn to design database schemas using Entity-Relationship models</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#f0fdf4'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaCode size={'25px'} color='#16a34a' />
                            <Typography variant='body1' fontWeight={500}>SQL & Relational Algebra</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Master SQL queries, joins, and relational operations</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#fff7ed'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <PiTreeStructureFill size={'25px'} color='#f67216' />
                            <Typography variant='body1' fontWeight={500}>Normalization</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Eliminate redundancy using functional dependencies and normal forms</Typography>
                    </Box>


                </Box>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={4} mt={3}>
                    <Box width={'100%'} height={'80px'} bgcolor={'#faf5ff'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaArrowRightArrowLeft size={'25px'} color='#9333ea' />
                            <Typography variant='body1' fontWeight={500}>Transactions & Concurrency</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Handle concurrent access, ACID properties, and deadlock prevention</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#fef2f2'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaSearch size={'25px'} color='#4f46e5' />
                            <Typography variant='body1' fontWeight={500}>Indexing & Optimization</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Optimize query performance using indexes and execution plans</Typography>
                    </Box>
                    <Box width={'100%'} height={'80px'} bgcolor={'#eef2ff'} p={3} borderRadius={3}>
                        <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                            <FaLock size={'25px'} color='#ef4444' />
                            <Typography variant='body1' fontWeight={500}>Security & Recovery</Typography>
                        </Box>
                        <Typography variant='body1' color='text.secondary'>Database security, backup strategies, and recovery mechanisms</Typography>
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
                        <FaBrain size="30px" color="#ffffff" />
                        <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Database Design</Typography>
                        <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Understand how databases are designed from requirements to implementation</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
                        <FaTerminal size="30px" color="#ffffff" />
                        <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Interactive SQL Editor</Typography>
                        <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Practice queries using our built-in SQL editor with real datasets</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
                        <FaArrowRightArrowLeft size="30px" color="#ffffff" />
                        <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Transaction Simulations</Typography>
                        <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Explore simulations for transaction behavior and locking mechanisms</Typography>
                    </Box>


                </Box>

            </Box>

            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mt={6} mb={3}>
                <Button sx={{ textTransform: "none", p: 1.5, width: '30%', bgcolor: '#4a90e2', color: '#ffffff', borderRadius: 2.5, fontSize: '18px',display:'flex', alignItems:'center ','&:hover': { bgcolor: '#367bbe' } }} onClick={''}><FaPlay style={{ marginRight: 5 }} />Start Learning - ER Model</Button>
                <Typography variant='body1' color='text.secondary' mt={2}>Begin with Entity-Relationship modeling and database design</Typography>
            </Box>



        </>
    );
}


export default DBMSIntro;