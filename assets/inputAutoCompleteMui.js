'use strict';

const elz = React.createElement;

const LikeButton2 = ()=>{
  const [liked, setLiked] = useState(false); 
  return (
    elz(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    )
  )
}

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return elz(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(elz(LikeButton2));