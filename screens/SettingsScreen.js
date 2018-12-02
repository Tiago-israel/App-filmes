import React from 'react';
import { Text, FlatList } from 'react-native'
import { Card } from 'react-native-elements'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Filmes',
  };
  key = '7df2fa6696347ec7f081ef69f3fa997d';
  apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.key}`;
  
  constructor(props) {
    super(props)
    this.state = { filmes: [], page: 1 }
    this.buscarFilmes();
  }

  buscarFilmes = async () => {
    const response = await fetch(`${this.apiUrl}&page=${this.state.page}`);
    const data = await response.json();
    if (data) {
      this.setState({ filmes: this.state.filmes.concat(data.results), page: this.state.page + 1 }
      );
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.filmes}
        renderItem={({ item }) => <Card
          title={item.title}
          image={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}>
          <Text>{item.overview}</Text>
        </Card>}
        onEndReached={this.buscarFilmes} />
    );
  }
}
