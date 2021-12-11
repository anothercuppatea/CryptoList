import React from 'react';
import App from './App';
import { shallow} from 'enzyme';

describe("Renders", ()=>{
  it("Renders root component", ()=>{
    shallow(<App />)
  })
})

// it('utilises loading state while data fetching is in progress.', () => {
//   const AppComponent = shallow(<App />)
//   AppComponent.setState({isLoading : true})
//   expect(AppComponent.find(LoadingSpinner).length).toBe(1)
//   // const linkElement = screen.getByText(/Something went wrong while attempting to fetch data./i);
//   // expect(linkElement).toBeInTheDocument();
// });
