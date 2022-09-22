import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {default as axios} from "axios";
import { useParams  } from "react-router-dom";
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from '@mui/material/Link';
import logo from './logo_w.png'
import "./Detail.css"
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Footer from './Footer';
import Map from './Map'
import key from "./key.json";
import logo1 from './logo.png'
import Star from './Star'
import Rating from "@mui/material/Rating";
import TextField from '@mui/material/TextField';
import img3 from './imgM/MountKosciuszko.jpg';
import img1 from "./imgM/Ironstone Mountain.jpg";
import img2 from "./imgM/Mother Cummings Peak.jpg";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Sunny from './sunny.png';
import Rainy from './rainy.png';
import Cloudy from './cloudy.png';
const url = "http://localhost:";
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
class Detail extends React.Component {
    state = {
        lat: 0,
        lng: 0,
        loginState: false,
        userName: this.getCookie('fname'),
        rateValue:0,
        Score:5
    };
    commentItemData = [
    ]
    recommends = [
        {
            img: img1,
            title: 'Bouddi',
            nation: 'Australia',
            name: 'Bouddi National Park',
        },
        {
            img: img2,
            title: 'Tasmanian',
            nation: 'Australia',
            name: 'Cradle Mountain',
        },
        {
            img: img3,
            title: 'Alpine',
            nation: 'Australia',
            name: 'Mount Kosciuszko',
        }
    ]

    weather=[
        {
            date: "9/23",
            picture: Cloudy,
            wind: '5 km/h'
        },
        {
            date: "9/24",
            picture: Sunny,
            wind: '15 km/h'
        },
        {
            date: "9/25",
            picture: Rainy,
            wind: '10 km/h'
        }
    ]
    initDetailOnload = () => {
        document.getElementById("mountName").innerHTML=this.getCookie("loc");
        document.getElementById("mountImage").src=require("./imgM/"+this.getCookie("loc")+".jpg");
        const params = {
            loc : this.getCookie("loc")

        }
        axios.post(url + "5000/mountainDetailOnload", params).then((res) => {
            var detail = res.data.res1[0];
            console.log(detail)
            this.setState({
                lat: parseFloat(detail.Latitude),
                lng: parseFloat(detail.Longitude),
                Score:detail.Score
            })

        })
    }
    commentDetailOnload(){
        const params = {
            loc : this.getCookie("loc")
        }
        axios.post(url + "5000/commentDetailOnload", params).then((res) => {
            var comments = res.data.res1;
            if (this.commentItemData.length !== comments.length){
                for (var i = 0;i<comments.length;i++){
                    var singleCom = {name:comments[i].userName,data:comments[i].time,comment:comments[i].comments}
                    this.commentItemData.push(singleCom)
                }
            }

        })
        console.log(this.commentItemData)
    }
    postComment= () =>{
        var userID = this.getCookie("uid");
        if (userID == ""){
            alert("Please login")
        }
        var text=document.getElementById("text").value;
        const params = {
            uid: userID,
            fname: this.getCookie("fname"),
            loc:this.getCookie("loc"),
            score:this.state.rateValue,
            comment: text
        }
        axios.post(url + "5000/postComment", params).then((res) => {
            window.location.reload();
        })
    }
    checkLogin() {
        var userID = this.getCookie("uid");
        if (userID !== "") {
            this.setState({loginState: true})
        } else {
            this.setState({loginState: false})
        }
    }
    logout() {
        document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.setState({loginState: false})
        document.location.reload();
    }
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
    showURL= () => {
        let location = this.getCookie("loc")
        console.log(location);
    }

    componentDidMount = () => {
        this.checkLogin();
        this.initDetailOnload();
        this.commentDetailOnload()
        this.setWeather();
    }

    setWeather=()=>{
        //Today date
        var date = new Date();
        var today = date.getMonth()+"/"+date.getDate();
        //Tomorrow date
        var dateTomorrow = date.setDate(date.getDate()+1);
        dateTomorrow = new Date(dateTomorrow);
        var tomorrow = dateTomorrow.getMonth()+"/"+dateTomorrow.getDate();
        // //set today's parameter
        // document.getElementById("weatherTodayDate").innerHTML=today;
        // document.getElementById("weatherTodayImg").innerHTML="Sunny";
        // document.getElementById("weatherTodayWind").innerHTML="today's wind speed";
        // //set tomorrow's parameter
        // document.getElementById("weatherTomorrowDate").innerHTML=tomorrow;
        // document.getElementById("weatherTomorrowImg").innerHTML="Rainy";
        // document.getElementById("weatherTomorrowWind").innerHTML="tomorrow's wind speed";
        for(var i=0;i<this.weather.length;i++){
            this.weather[i].date=today;


        }

    }
    render() {
        return (
            <div>
                <Button onClick={this.showURL}>show url</Button>
                <Grid className={"column"} container>
                    <Grid className={"topFirstColumn"} item xs={3} md={4} lg={4}>
                        <img src={logo1} height={25} width={25} style={{paddingLeft: 10, marginBottom: 3}}
                             className={"center"}/>
                        <span className={"serif"}
                              style={{
                                  position: "relative",
                                  marginTop: 2,
                                  paddingLeft: 15,
                                  color: "white",
                                  fontSize: 30
                              }}>We Climb</span>
                    </Grid>
                    <Grid className={"topSecondColumn"} item xs={2} md={4} lg={5}
                          style={{paddingTop: 5, position: "relative"}}>
                        <Link style={{paddingRight: 20, paddingLeft: 190}} to="/" color={"white"}
                              underline="hover">Home</Link>
                        <Link style={{paddingRight: 20}} to="/" color={"white"} underline="hover">Community</Link>
                    </Grid>
                    <Grid item xs={3} md={4} lg={3}>
                        {
                            this.state.loginState ? (
                                <Stack spacing={2} direction="row" style={{paddingRight: 120}}>
                                    <Button fullWidth variant="outlined" href={"/Login"}>
                                        <div>{this.state.userName}</div>
                                    </Button>
                                    <Button fullWidth variant="outlined" href={"/Register"}>Setting</Button>
                                    <Button fullWidth variant="outlined" onClick={this.logout}
                                            href={"/"}>Logout</Button>
                                </Stack>) : (
                                <Grid style={{paddingLeft: 50, paddingRight: 10}}>
                                    <Stack spacing={2} direction="row">
                                        <Button size={"small"} fullWidth variant="outlined" href={"/Login"}>
                                            Login
                                        </Button>
                                        <Button fullWidth variant="outlined"
                                                href={"/Register"}>Register</Button>
                                    </Stack>

                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>

                <Grid container className={"container"}>
                    <Grid item md={1} ></Grid>
                    <Grid item md={10} className={"circle"}>
                        <img id="mountImage" src={require("./imgM/mountKeira.jpg")} className={"image"} title={"Mount Keira"} style={{borderRadius:20}}/>
                        <span id="mountName" style={{color:"white",fontSize:80,left:290,top:100,position:"absolute"}}>Mount Keira</span>
                        <span style={{fontSize:100,left:290,top:150,position:"absolute"}}>
                            <Rating id="showRating" size={"large"} value={this.state.Score} readOnly={true}></Rating>
                        </span>
                    </Grid>
                    <Grid item md={1} ></Grid>


                    <Grid container md={12}><br/></Grid>

                <Grid container >
                    <Grid item md={1} ></Grid>
                    <Grid item md={7} className={"circle"}>
                        <Stack direction="column">
                            <Stack style={{fontSize:20}} >
                            Try this 6.8km loop trail near Mount Keira, New South Wales.<br/>
                            Generally considered a moderately challenging route, it takes an average of 2h 20min to complete.
                            </Stack>
                            <br/>


                            <Stack className={"temp"} style={{fontSize:25,fontWeight:500}}>
                             Weather
                            </Stack>
                            <br/>
                            <Stack className={"temp"} direction="row" spacing={10}>
                                {/*<Stack>*/}
                                {/*    <span id="weatherTodayDate">date</span>*/}
                                {/*    <span id="weatherTodayImg">img</span>*/}
                                {/*    <span id="weatherTodayWind">wind speed</span>*/}

                                {/*</Stack>*/}
                                {/*<Stack>*/}
                                {/*    <span id="weatherTomorrowDate">date</span>*/}
                                {/*    <span id="weatherTomorrowImg">img</span>*/}
                                {/*    <span id="weatherTomorrowWind">wind speed</span>*/}
                                {/*</Stack>*/}

                                    {this.weather.map((item) => (
                                        <div>
                                            <Stack>
                                                <ListItemText primary={item.date}></ListItemText>
                                                < img src={item.picture}  style={{height:50,width:50}}/>
                                                <ListItemText primary={item.wind}></ListItemText>
                                            </Stack>

                                        </div>
                                    ))}

                            </Stack>
                            <br/>
                            <Stack className={"temp"} style={{fontSize:25,fontWeight:500}}>
                                Reviews History
                            </Stack>
                            <br/>
                            <Stack>
                                <List
                                    sx={{
                                        width: '100%',
                                        maxWidth: 360,
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    {this.commentItemData.map((item) => (
                                        <div>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <AccountCircleIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={item.name+"    "+item.data} secondary={item.comment} />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </div>
                                    ))}

                                </List>
                            </Stack>
                            <br/>
                            <Stack className={"temp"} style={{fontSize:25,fontWeight:500}}>
                                Your Review
                            </Stack>
                            <br/>
                            <Stack>
                                <Rating  name="rate" size={"large"} onChange={(event, newValue) => {
                                    this.setState({rateValue:newValue})}} ></Rating>

                            </Stack>
                            <br/>
                            <Stack>
                                <Stack spacing={2} direction="row" style={{paddingRight: 120}}>
                                    <TextField id="text" label="Please write your comment" variant="outlined" fullWidth multiline maxRows={5}></TextField>
                                    <Button  variant="outlined" onClick={this.postComment}
                                           >Comment</Button>
                                </Stack>

                            </Stack>
                        </Stack>


                    </Grid>

                    <Grid item md={3}  className={"circle1"}>

                        <div>
                            <Map lat={this.state.lat} lng={this.state.lng}></Map>
                            <br/>
                        </div>

                        {this.recommends.map((item) => (
                            <div>
                                <Paper
                                    sx={{
                                        p: 2,
                                        margin: 'left',
                                        maxWidth: 350,
                                        flexGrow: 1,
                                        // backgroundColor: (theme) =>
                                        //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <ButtonBase sx={{ width: 128, height: 128 }}>
                                                <Img alt="complex" src={item.img}/>
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1" component="div">
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {item.title}
                                                        {item.nation}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Paper>
                                <br/>
                            </div>))}
                    </Grid>

                    <Grid item md={1} ></Grid>
                </Grid>



                </Grid>
                <br/>
                <Footer>
                </Footer>
            </div>

        )
    }
}


export default Detail;