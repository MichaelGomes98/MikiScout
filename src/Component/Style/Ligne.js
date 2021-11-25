export default function Line(props) {
return(
      <hr
          style={{
              backgroundColor: props.color,
              height: 2,
              width:"80%",
              justifyContent: 'center',
              textAlign:"center"
          }}
      />
    );
}
