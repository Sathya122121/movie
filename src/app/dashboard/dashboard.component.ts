import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../Model/movie';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

latestMovie : any;
popularMovies !: Movie;
nowPlayingMovies !: Movie;
topRatedMovies !: Movie;
upComingMovies !: Movie;
trendingMovies !: Movie;
originals !: Movie;



  constructor(private service : DataService) { }

  ngOnInit(): void {
    this.getLatestMovie();
    this.getNowPlayingMovies();
    this.getOriginal();
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getTrendingMovies();
    this.getUpcomingMovies();
  }

  getLatestMovie(){
    this.service.getlatestMovie().subscribe(res=>{
      this.latestMovie = this.changeData(res);
      console.log(this.latestMovie)
    },err =>{
      console.log('not loaded',err)
    })
  }
  changeData(res: any): any {
    if(!res.backdrop_path){
      res.backdrop_path='https://image.tmdb.org/t/p/original'+res.poster_path+'?api_key='+environment.api_key;
    }else{
      res.backdrop_path='https://image.tmdb.org/t/p/original'+res.backdrop_path+'?api_key='+environment.api_key;

    }
    return res;
  }

  getPopularMovies(){
    this.service.getPopularMovies().subscribe(res=>{
      this.popularMovies = this.modifyData(res);
    },err =>{
      console.log('not loaded',err)
    })

  }

  getNowPlayingMovies(){
    this.service.getNowPlayingMovies().subscribe(res=>{
      this.nowPlayingMovies = this.modifyData(res);
    },err =>{
      console.log('not loaded',err)
    })
  }

  getTopRatedMovies(){
    this.service.getTopRatedMovies().subscribe(res=>{
      this.topRatedMovies = this.modifyData(res);
    },err =>{
      console.log('not loaded',err)
    })
  }

  getUpcomingMovies(){
    this.service.getUpcomingMovies().subscribe(res=>{
      this.upComingMovies = this.modifyData(res);
    },err =>{
      console.log('not loaded',err)
    })
  }

  getTrendingMovies(){
    this.service.getTrendingMovies().subscribe(res=>{
      this.trendingMovies = this.modifyData(res);
    },err =>{
      console.log('not loaded',err)
    })
  }

  getOriginal(){
    this.service.getoriginals().subscribe(res=>{
      this.originals = this.modifyData(res);
    },err =>{
      console.log('not loaded',err)
    })
  }

  modifyData(movies : Movie): Movie{
    if(movies.results){
      movies.results.forEach(element =>{
        element.backdrop_path ='https://image.tmdb.org/t/p/original'+element.backdrop_path+'?api_key='+environment.api_key;
        if(!element.title){
          element.title = element?.name;
        }
      });

    }
    return movies;
  }

}
