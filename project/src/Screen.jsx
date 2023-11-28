import { useState, useEffect, CSSProperties } from 'react' 
import './screen.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRotateLeft } from "@fortawesome/free-solid-svg-icons";


function Credits({state}) {
    return(
        <>
        <div className={state != 'clear' ? 'credits opacity-zero' : 'credits' }>
                <h1> Project explanation </h1>

                <h3> How did you decided your topic? </h3>
                <p> 
                    I spent a lot of time pondering about what I wanted to make as a final project. I wanted to make something great, amazing, WORLD DEFINING!
                    In the end, I decided that, right now, that goal was just too much for a student like me. I then looked inward and realized that if I wanted to 
                    make something that can make an impact on the world I would need to hone my skills, I needed to learn more. I took 3 technologies I wanted to learn more about
                    and decided to base my project on learning those skills.       
                </p>

                <h3> What new skills will you need to acquire? What topics will you need to research? </h3>
                <p> 
                    The bulk of my project was spend researching and learning about the new technologies. I had some experience with React but no idea how to use Three.js, Cannon-es, and gsap.
                    My goal was to make this site the most beautiful site i'd ever made, so I was imperative that I learned proper animations and how to optimize the Three.js render to keep a good framerate.  
                </p>

                <h3> In the world of software, most everything takes longer to implement than you expect. And so it's not uncommon to accomplish less in a fixed amount of time than you hope. What might you consider to be a good outcome for your project? A better outcome? The best outcome? </h3>
                <p> 
                    I knew going into this project that everything would take much much longer than I expected. I knew i'd be doing research, re-research, and then more research. I took this project as another
                    opputunity to learn something new. Not to just follow a tutorial but also implement them into something that is whole. If you ask me, I was able to get the best outcome from this project because in the end I was able to learn
                    many new things that I hadn't learned before plus I was able to walk away with a pretty rad looking website.
                </p>

        </div>
        </>
    )
}

function SideBarItem({ name, id, isVisable, onClick, order }) {
    const [isHover, setIsHover] = useState(false);

    return (
      <div className="side-bar-item" onClick={onClick}>
        <div className="side-bar-outer ">
          <div
            className={isVisable ? "item-inner item-up" : "item-inner item-down"}
            id={id}
            style={{"--animation-order":order }}
          >
            <div
              className={isHover ? "glitched" : ""}
              title={name}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {name}
            </div>
          </div>
        </div>
      </div>
    );
}

export default function Screen(props) {
    const [isVisable, setIsVisable] = useState(false);
    const [isResetHover, setIsResetHover] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isFlippable, setIsFlippable] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    const scene=props.scene;
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 10000);

        // console.log(props.sceneState);

        if (props.sceneState === 'dice' || props.sceneState === 'coin') {
            setIsFlippable(true);
        } else {
            setIsFlippable(false);
        }
    });

    const handleClick = () => {
        if (isVisable) {
          setIsVisable(false);
        } else {
          setIsVisable(true);
        }
      };

    const handleFlip = () => {
        // console.log(scene.state)
        // props.setSceneState(scene.state)
        if (scene.state === 'dice') {
            scene.throwDice();
        } 
        else if (scene.state === 'coin') {
            scene.flipCoin();
        }
    }

    const selectCoin = () => {
        scene.removeDice();
        scene.selectCoin();
        props.setSceneState(scene.state);
    }

    const selectDice = () => {
        scene.removeCoin();
        scene.selectDice();
        props.setSceneState(scene.state);
    }

    const selectState = () => {
        scene.selectState();
        props.setSceneState(scene.state);
    }

    const enter = () => {
        scene.selectState();
        setHasEntered(true);
        props.setSceneState(scene.state);
    }

    const setState = () => {
        props.setSceneState(scene.state);
    }

    const loadCredits = () => {
        scene.clearState();
        props.setSceneState(scene.state);
    }

    return (
        <div className='Wrapper'>
            <div className='enter'>
                <div id="load">
                    <div>G</div>
                    <div>N</div>
                    <div>I</div>
                    <div>D</div>
                    <div>A</div>
                    <div>O</div>
                    <div>L</div>
                </div>
            </div>

            <div className={isLoading ? "enter-btn" : (props.sceneState === "empty" ? "enter-btn enter-btn-animate" : "enter-btn enter-btn-animate-out")} onClick = {!hasEntered ? enter : () => {}}>
                <div className='enter-btn-txt'> Enter </div>
            </div>

            <div className={isLoading? "title opacity-zero" : (props.sceneState == "clear" ? "title opacity-zero" : "title")}> Flip-Dice-Online </div>

            <div className={isLoading? "hamburg opacity-zero" : "hamburg"} onClick={handleClick}>
                <FontAwesomeIcon
                    icon={faBars}
                    size="2xl"
                    style={{ color: "#ffffff" }}
                />
            </div>
            <div
                className={ isLoading ? "reset-btn opacity-zero" : (isResetHover ? "reset-btn rotate" : "reset-btn")}
                onMouseEnter={() => setIsResetHover(true)}
                onMouseLeave={() => setIsResetHover(false)}
                onClick={selectState}
            >
                <FontAwesomeIcon icon={faRotateLeft} size="2xl" style={{ color: "#ffffff" }}/>
            </div>
            <div
                className={isLoading ? 'side-bar-wrapper hidden' : 'side-bar-wrapper'}
            >
                <SideBarItem name={"Reset"} id={"item1"} isVisable={isVisable} onClick={selectState} order={1} />
                <SideBarItem name={"Load Dice"} id={"item2"} isVisable={isVisable} onClick={selectDice} order={2} />
                <SideBarItem name={"Load Coin"} id={"item3"} isVisable={isVisable} onClick={selectCoin} order={3} />
                <SideBarItem name={"Credits"} id={"item4"} isVisable={isVisable} onClick={loadCredits} order={5} />
            </div>
            <div className={isFlippable ? 'center-item' : 'center-item hidden'} id="results">head</div>
            <div className='button-wrapper' id='flip-btn'>
                {/* Let's just pretend that the following code is not absolutely hideous */}
                <div className='button-container' onClick={handleFlip} onMouseEnter={setState}>{ props.sceneState !== "select" ? 
                                                                                                    (props.sceneState === 'dice' 
                                                                                                        ? 'roll ' + props.sceneState 
                                                                                                        : ( props.sceneState === "coin" ? 'flip ' + props.sceneState : "" )
                                                                                                    )
                                                                                                    : 
                                                                                                    "Select from above"}
                                                                                                    </div>
            </div>

            <Credits state = {props.sceneState} />
        </div>
    )
}