import { useEffect, useState } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

const TodoInput = ({iconName, description, Component}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isComponentHovered, setIsComponentHovered] = useState(false);
  const controls = useAnimationControls();

  const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }

  const descriptionStyle = {
    // width: "fit-content",
    fontFamily: 'Sunflower, sans',
    position: "absolute",
    // bottom:"5%",
    // left:"50%",
    transform: "translate(0, 150%)",
    fontSize:"1.5rem",
    fontWeight: 1000,
    // transition: ".3s all",
    opacity: "1"
  }

  const disabled = {
    opacity: "0",
    display: "none"
  }

  const componentStyle = {
    backgroundColor: "rgba(130, 130, 130, 1)",
    borderRadius: "20px",
    position: "absolute",
    // transition: ".3s all",
    height: "150px",
    width: "250px",
    // transform: "translate(0, -50%)",
    padding: "5px",
    overflow: "hidden",
    opacity: "1",
    boxShadow: "0px 0px 7px grey",
    color: "white"
  }

  // document.body.addEventListener("click", (e)=> {
  //   console.log(isComponentHovered, isClicked)
  //   if (!isComponentHovered && isClicked && !isHovered) {
  //     setIsClicked(false);
  //   }
  // })

  const clickAnimation = async() => {
    if (isClicked) {
      await controls.start({display:"block"})
      controls.start({opacity:1, y: -150,transition:{duration: 0.2}})
    } else {
      await controls.start({opacity:0, y: -100,transition:{duration: 0.2}})
      controls.start({display:"none"})
    }
    
  }

  useEffect(()=> {
    clickAnimation();
  }, [controls, isClicked])

  return (
    <div style={rootStyle}>
      <motion.div 
          style={Object.assign({}, componentStyle, !isClicked&&disabled)}
          onMouseEnter={()=>setIsComponentHovered(true)}
          onMouseLeave={()=>setIsComponentHovered(false)}
          className="todoComponent"
          animate={controls}
        >
          {Component}
      </motion.div>
      
      <motion.span className="material-symbols-outlined"
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
        onClick={()=>setIsClicked(pre=>!pre)}
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {iconName}
      </motion.span>
      <AnimatePresence>
        {isHovered&&(
          <motion.div 
          style={descriptionStyle}
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          exit={{ opacity: 0}}
        >
          {description}
        </motion.div>
        )}
        
      </AnimatePresence>
      
      
      
    </div>
    
  );
}

export default TodoInput;