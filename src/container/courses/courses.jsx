import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomeCourse from './home';
import EditCourse from './edit';

export default class Course extends Component {
    render() {
        return (
            <Switch>
                <Route path='/courses' component={HomeCourse} exact/>
                <Route path='/courses/edit' component={EditCourse}/>
                <Redirect to='/courses'/>
            </Switch>
        )
    }
}
