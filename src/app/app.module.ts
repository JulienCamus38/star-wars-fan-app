import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { ResourceListComponent } from './resource-list';
import { SearchFilterPipe } from './_pipes/search-filter.pipe';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { FilmComponent } from './_details/film/film.component';
import { PeopleComponent } from './_details/people/people.component';
import { PlanetComponent } from './_details/planet/planet.component';
import { SpeciesComponent } from './_details/species/species.component';
import { StarshipComponent } from './_details/starship/starship.component';
import { VehicleComponent } from './_details/vehicle/vehicle.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        ResourceListComponent,
        SearchFilterPipe,
        ResourceDetailsComponent,
        FilmComponent,
        PeopleComponent,
        PlanetComponent,
        SpeciesComponent,
        StarshipComponent,
        VehicleComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        HttpClientModule,
        SearchFilterPipe,

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };