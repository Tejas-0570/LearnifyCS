import { Box, Button, Typography } from '@mui/material';
import { FaCloud } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa6";
import { FaPuzzlePiece } from "react-icons/fa6";
import { FaServer } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa6";
import { FaGamepad } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { BsStack } from "react-icons/bs";
import { TbBinaryTreeFilled, TbCaretUpDownFilled } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { GrOptimize } from "react-icons/gr";

const DSAIntro = () => {
  const handleStartLearning = () => {
    window.location.href = '/dsa/array';
  };
  return (
    <>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={3}>
        <Typography variant='h4' fontWeight={600}>Introduction to Data Structures & Algorithms (DSA)</Typography>
        <Typography variant='body1' color='text.secondary'>
          <h3>Master the foundation of efficient problem-solving in Computer Science</h3>
        </Typography>
      </Box>


      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: 3,
          mb: 3,
          borderRadius: 2,
          boxShadow: 1,
          height: "400px",
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
            What is Data Structures & Algorithms?
          </Typography>

          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} mt={3}>
            <Box>
              <Typography variant='h6'>Data Structures</Typography>
              <Typography variant='body1' color='text.secondary'>Data structures are specialized formats for organizing, processing, and storing data in computer memory. They provide efficient ways to access and modify data based on specific requirements.</Typography>
              <Box backgroundColor='#e8f2ff' height={'80%'} width={'95%'} borderRadius={3} p={1.5} mt={3}>
                <Typography variant='h6'>Examples:</Typography>
                <Typography variant='body1' color='text.secondary'>
                  <ul>
                    <li>Arrays - Sequential data storage</li>
                    <li>Trees - Hierarchical data organization</li>
                    <li>Graphs - Network relationships</li>
                    <li>Hash Tables - Fast data retrieval</li>
                  </ul>
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant='h6'>Algorithms</Typography>
              <Typography variant='body1' color='text.secondary'>Algorithms are step-by-step procedures or formulas for solving computational problems. They define the logical sequence of operations to transform input data into desired output efficiently.</Typography>
              <Box backgroundColor='#f0fdf4' height={'80%'} width={'95%'} borderRadius={3} p={1.5} mt={3}>
                <Typography variant='h6'>Key Types:</Typography>
                <Typography variant='body1' color='text.secondary'>
                  <ul>
                    <li>Sorting - Organizing data in order</li>
                    <li>Searching - Finding specific elements</li>
                    <li>Graph Traversal - Exploring networks</li>
                    <li> Dynamic Programming - Optimization</li>
                  </ul>
                </Typography>
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
          height: "480px",
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
          Why Learn Data Structures & Algorithms?
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
              <GrOptimize size="30px" color="#4a90e2" /> {/* icon color purple */}
            </Box>
            <Typography variant='h7' fontWeight={500} mt={3}>System Optimization</Typography>
            <Typography variant='body1' color='text.secondary' mt={1.5}>Develops logical thinking and systematic approaches to complex computational challenges</Typography>
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
              <FaPuzzlePiece size="30px" color="#9333ea" /> {/* icon color purple */}
            </Box>
            <Typography variant='h7' fontWeight={500} mt={3}>Problem Solving</Typography>
            <Typography variant='body1' color='text.secondary' mt={1.5}>Foundation for building efficient, scalable applications and optimizing system performance</Typography>
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
            <Typography variant='body1' color='text.secondary' mt={1.5}>Critical for technical interviews, competitive programming, and landing top tech roles</Typography>
          </Box>
        </Box>

        <Box width={'97%'} height={'140px'} bgcolor={'red'} mt={5} borderRadius={2} sx={{ background: 'linear-gradient(to right, #e8f2ff, #e6e0ff)', padding: 2 }}>
          <Typography variant='h6'>Required in Every CS Career Path:</Typography>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2} gap={3}>
            <Box width={'100%'} height={'80px'} bgcolor={'#ffffff'} borderRadius={2} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <FaServer color='#5da2e3' size={'20px'} />
              <Typography variant='body1' color='text.secondary'>Backend Development</Typography>
            </Box>
            <Box width={'100%'} height={'80px'} bgcolor={'#ffffff'} borderRadius={2} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <FaRobot color='#16a34a' size={'20px'} />
              <Typography variant='body1' color='text.secondary'>AI/ML Engineering</Typography>
            </Box>
            <Box width={'100%'} height={'80px'} bgcolor={'#ffffff'} borderRadius={2} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <FaGamepad color='#9333ea' size={'20px'} />
              <Typography variant='body1' color='text.secondary'>Game Development</Typography>
            </Box>
            <Box width={'100%'} height={'80px'} bgcolor={'#ffffff'} borderRadius={2} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <FaShieldAlt color='#ef4444' size={'20px'} />
              <Typography variant='body1' color='text.secondary'>Cybersecurity</Typography>
            </Box>
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
          height: "600px",
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
          What You'll Learn in This DSA Lab
        </Typography>

        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={4} mt={3}>
          <Box width={'100%'} height={'80px'} bgcolor={'#e8f2ff'} p={3} borderRadius={3}>
            <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
              <FaList size={'25px'} color='#4a90e2' />
              <Typography variant='body1' fontWeight={500}>Arrays & Linked Lists</Typography>
            </Box>
            <Typography variant='body1' color='text.secondary'>Master linear data structures, memory allocation, and pointer manipulation</Typography>
          </Box>
          <Box width={'100%'} height={'80px'} bgcolor={'#f0fdf4'} p={3} borderRadius={3}>
            <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
              <BsStack size={'25px'} color='#16a34a' />
              <Typography variant='body1' fontWeight={500}>Stacks & Queues</Typography>
            </Box>
            <Typography variant='body1' color='text.secondary'>Learn LIFO and FIFO principles with real-world applications</Typography>
          </Box>
          <Box width={'100%'} height={'80px'} bgcolor={'#fff7ed'} p={3} borderRadius={3}>
            <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
              <TbBinaryTreeFilled size={'25px'} color='#f67216' />
              <Typography variant='body1' fontWeight={500}>Trees & Graphs</Typography>
            </Box>
            <Typography variant='body1' color='text.secondary'>Explore hierarchical and network data structures with traversal algorithms</Typography>
          </Box>


        </Box>

        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={4} mt={3}>
          <Box width={'100%'} height={'80px'} bgcolor={'#faf5ff'} p={3} borderRadius={3}>
            <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
              <TbCaretUpDownFilled size={'25px'} color='#9333ea' />
              <Typography variant='body1' fontWeight={500}>Sorting Techniques</Typography>
            </Box>
            <Typography variant='body1' color='text.secondary'>Master Bubble, Quick, Merge Sort with complexity analysis</Typography>
          </Box>
          <Box width={'100%'} height={'80px'} bgcolor={'#fef2f2'} p={3} borderRadius={3}>
            <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
              <FaSearch size={'25px'} color='#ef4444' />
              <Typography variant='body1' fontWeight={500}>Searching Algorithms</Typography>
            </Box>
            <Typography variant='body1' color='text.secondary'>Linear and Binary search with optimization strategies</Typography>
          </Box>
          <Box width={'100%'} height={'80px'} bgcolor={'#eef2ff'} p={3} borderRadius={3}>
            <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
              <FaHashtag size={'25px'} color='#4f46e5' />
              <Typography variant='body1' fontWeight={500}>Hashing</Typography>
            </Box>
            <Typography variant='body1' color='text.secondary'>Hash tables, collision handling, and fast data retrieval</Typography>
          </Box>


        </Box>


        <Box width={'97%'} height={'140px'} bgcolor={'red'} mt={5} borderRadius={2} sx={{ background: 'linear-gradient(to right, #e8f2ff, #e6e0ff)', padding: 2 }}>
          <Typography variant='h6'>Advanced Algorithmic Patterns:</Typography>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2} gap={3}>
            <Box width={'100%'} height={'90px'} bgcolor={'#ffffff'} borderRadius={2} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <FaLeaf color='#5da2e3' size={'20px'} />
              <Typography variant='body1' color='text.primary'>Greedy Algorithms</Typography>
              <Typography variant='body1' fontSize={'13px'} color='text.secondary'>Optimal local choices</Typography>
            </Box>
            <Box width={'100%'} height={'90px'} bgcolor={'#ffffff'} borderRadius={2} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <GoGraph color='#16a34a' size={'20px'} />
              <Typography variant='body1' color='text.primary'>Dynamic Programming</Typography>
              <Typography variant='body1' fontSize={'13px'} color='text.secondary'>Optimization problems</Typography>
            </Box>
            <Box width={'100%'} height={'90px'} bgcolor={'#ffffff'} borderRadius={2} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <FaArrowRotateLeft color='#9333ea' size={'20px'} />
              <Typography variant='body1' color='text.primary'>Backtracking</Typography>
              <Typography variant='body1' fontSize={'13px'} color='text.secondary'>Explore all solutions</Typography>
            </Box>
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
            <FaRegEye size="30px" color="#ffffff" />
            <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Visual Learning</Typography>
            <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Understand concepts through clear theory and animated visualizations</Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
            <FaPlay size="30px" color="#ffffff" />
            <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Algorithm Tracing</Typography>
            <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Practice dry runs and trace algorithm steps in real time</Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
            <FaCode size="30px" color="#ffffff" />
            <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>Problem Solving</Typography>
            <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Solve real-world coding problems related to each concept</Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} bgcolor={'#5c9ae4'} p={2} width={'30%'} borderRadius={3}>
            <FaRobot size="30px" color="#ffffff" />
            <Typography variant='h7' fontWeight={500} mt={1} color='#ffffff'>AI Assistant</Typography>
            <Typography variant='body1' fontSize={'14px'} color='#ffffff' mt={1.5}>Use the integrated chatbot to ask topic-based questions anytime</Typography>
          </Box>

          
        </Box>

      </Box>

      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mt={6} mb={3}>
        <Button sx={{ textTransform: "none", p: 1.5, width: '25%', bgcolor: '#4a90e2', color: '#ffffff', borderRadius: 2.5, fontSize:'18px' ,'&:hover': { bgcolor: '#367bbe' } }} onClick={handleStartLearning}><FaPlay style={{ marginRight: 5 }} />Start Learning - Array</Button>
        <Typography variant='body1' color='text.secondary' mt={2}>Begin your DSA journey with fundamental array operations</Typography>
      </Box>



    </>
  );
}

export default DSAIntro;