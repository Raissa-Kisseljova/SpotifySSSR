import React from "react";
import AlbumCard from "./AlbumCard";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fillSongsAction } from "../redux/actions";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  fetchSongs: () => dispatch(fillSongsAction()),
});

class Home extends React.Component {
  state = {
    rockSongs: [],
    popSongs: [],
    hipHopSongs: [],
  };

  rockArtists = [
    "queen",
    "u2",
    "thepolice",
    "eagles",
    "thedoors",
    "oasis",
    "thewho",
    "bonjovi",
  ];

  popArtists = [
    "arianagrande",
    "maroon5",
    "onerepublic",
    "coldplay",
    "katyperry",
  ];

  hipHopArtists = ["eminem", "snoopdogg", "lilwayne", "drake", "kanyewest"];

  handleArtist = async (artistName, category) => {
    try {
      await this.props.fetchSongs(artistName, category);

      this.setState(this.props.song.data);
      // let response = await fetch(
      //   "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
      //     artistName,
      //   {
      //     method: "GET",
      //     headers: new Headers({
      //       "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      //       "X-RapidAPI-Key":
      //         "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
      //     }),
      //   }
      // );

      // let result = await response.json();
      // let songInfo = result.data;
      // this.setState({
      //   [category]: [...this.state[category], songInfo[0]],
      // });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = async () => {
    this.props.fetchSongs();
  };

  render() {
    console.log(this.props.song.data, "THIS IS THE REDUX STATE DATA[0]");
    // console.log(this.state, "THIS IS THE COMPONENT STATE");
    // console.log(this.props.song, "THIS");
    return this.props.song.error ? (
      "ERROR!!"
    ) : this.props.song.loading ? (
      "LOADING!!"
    ) : (
      <Col className='col-12 col-md-9 offset-md-3 mainPage'>
        <Row>
          <div className='col-9 col-lg-11 mainLinks d-none d-md-flex'>
            <div>TRENDING</div>
            <div>PODCAST</div>
            <div>MOODS AND GENRES</div>
            <div>NEW RELEASES</div>
            <div>DISCOVER</div>
          </div>
        </Row>
        {this.props.searchResults.length > 0 && (
          <Row>
            <Col xs={10}>
              <div id='searchResults'>
                <h2>Search Results</h2>
                <Row className='row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3'>
                  {this.props.searchResults.map((song) => (
                    <AlbumCard song={song} key={song.id} />
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        )}
        {this.props.searchResults.length === 0 && (
          <>
            <Row>
              <Col xs={10}>
                <div id='rock'>
                  <h2>Rock Classics</h2>
                  <Row
                    className='row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3'
                    id='rockSection'>
                    {this.props.song.data.rockSongs[0]?.map((song) => (
                      <AlbumCard song={song} key={song.id} />
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={10}>
                <div id='pop'>
                  <h2>Pop Culture</h2>
                  <Row
                    className='row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3'
                    id='popSection'>
                    {this.props.song.data.popSongs[0]?.map((song) => (
                      <AlbumCard song={song} key={song.id} />
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={10}>
                <div id='hiphop'>
                  <h2>#HipHop</h2>
                  <Row
                    className='row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3'
                    id='hipHopSection'>
                    {this.props.song.data.hipHopSongs[1]?.map((song) => (
                      <AlbumCard song={song} key={song.id} />
                    ))}
                  </Row>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Col>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
