import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tagActions from './tagActions';
import { countryListOptions } from './countryListOptions';
import Select, { components } from 'react-select';

const AddTag = ({ tags, tagActions }) => {
	
	const [selectedCountry, setSelectedCountry] = useState(null);
	
	const handleSelectChange = (selectedCountry) => {
		alert("Hej")
		setSelectedCountry(selectedCountry);
		if (selectedCountry) {
			tagActions.addTag(selectedCountry.value);
		}
	}
	
	const customStyles = {
		option: (provided, state) => ({
			...provided,
			textAlign: "left",
		}),
		control: (provided, state) => ({
			...provided,
			borderRadius: '20px',
			marginTop: '5rem'
		})
	}
	
	console.log(tags);
	console.log(selectedCountry);

	return (
		<div className="container">
			<div className="row">
				<div className="col-4" style={{"margin": "5rem auto"}}>
					<button type="button" className="close" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
					<Select
						styles={customStyles}
						value={selectedCountry}
						options={countryListOptions} 
						onChange={handleSelectChange} 
						isSearchable={true}
						placeholder={`write your text here`}
						isClearable={true}
					/>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
  tags: state.tagReducer.tags
})

const mapDispatchToProps = (dispatch) => ({
  tagActions: bindActionCreators(tagActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTag);