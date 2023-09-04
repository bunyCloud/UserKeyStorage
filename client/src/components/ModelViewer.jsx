import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ErrorDiv = styled.div`
  background-color: #ffffffdd;
  border-radius: 16px;
  padding: 16px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  transition: opacity 0.3s;

  &.hide {
    opacity: 0;
    visibility: hidden;
    transition: visibility 2s, opacity 1s 1s;
  }
`;

function ModelViewer() {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    const handleARStatus = (event) => {
      if (event.detail.status === 'failed') {
        const error = document.querySelector("#error");
        error.classList.remove('hide');

        error.addEventListener('transitionend', () => {
          error.classList.add('hide');
        });
      }
    };

    modelViewerRef.current.addEventListener('ar-status', handleARStatus);

    // Cleanup to remove the event listener when component unmounts
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      modelViewerRef.current.removeEventListener('ar-status', handleARStatus);
    };
  }, []);

  return (
    <>
      <model-viewer
        ref={modelViewerRef}
        id="model-viewer"
        src="/buny-text.glb"
        ar
        style={{
                        width: '120px',
                        height: '120px',
//marginLeft: '-10px',
                        backgroundColor: 'transparent',
                      }}
        ar-modes="scene-viewer webxr"
        //camera-controls
        touch-action="pan-y"
        alt="A 3D model of an astronaut"
        //skybox-image="/header.hdr"
      >
        <ErrorDiv id="error" className="hide">
          AR is not supported on this device
        </ErrorDiv>
      </model-viewer>
    </>
  );
}

export default ModelViewer;
