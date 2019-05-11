import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokemon';
  limit = 20;
  search = "";
  showLoader= false;
  limitList = [5, 10, 15, 20, 25, 30, 40, 50, 60];
  pokemonList = [];
  respList = [];
  next = '';
  previous = '';
  details;

  constructor(private http: HttpClient) {
  }

  searchList() {
    if (this.search) {
      this.pokemonList = this.respList.filter(pokimon => {
        return pokimon.name.startsWith(this.search.trim());
      })
    } else {
      this.pokemonList = this.respList;
    }

  }
  ngOnInit(): void {
    this.getData("https://pokeapi.co/api/v2/pokemon/?limit=" + this.limit + "&offset=0")
  }

  nextList() {
    if (this.next) this.getData(this.next);
  }

  prevList() {
    if (this.previous) this.getData(this.previous)
  }

  getData(url) {
    this.showLoader =true;
    this.details = undefined;
    this.http.get(url).subscribe(resp => {
      console.log("bang", resp);
      this.respList = resp["results"];
      this.searchList();
      this.next = resp["next"];
      this.previous = resp["previous"];
      this.showLoader =false;
    },
    error=>{
      this.showLoader =false;
      alert("something went wrong")
    })
  }

  getDetails(url) {
    this.showLoader =true;
    this.http.get(url).subscribe(resp => {
      this.details = resp;
      this.showLoader =false;
    },
    error=>{
      this.showLoader =false;
      alert("something went wrong")
    })
  }
}
