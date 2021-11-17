import Modal from '@mui/material/Modal';

const VideoModal = props =>{
    const { srcKey, handleClose } = props;
    return (
        <Modal
            open={true}
            onClose={handleClose}
        >
            <div className="iframe-container">
                <iframe 
                    width="100%" 
                    height="345" 
                    src={`https://www.youtube.com/embed/${srcKey}?rel=0&autoplay=1`} 
                    frameborder="0" 
                    allowFullScreen 
                />
            </div>
        </Modal>
    )
}

export default VideoModal;