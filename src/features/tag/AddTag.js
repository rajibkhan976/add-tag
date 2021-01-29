import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tagActions from './tagActions';
import { countryListOptions } from './countryListOptions';
import Select, { components } from 'react-select';

const AddTag = ({ tagActions, tags }) => {
	
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [showCountryList, setShowCountryList] = useState(false);
	const [showTagList, setShowTagList] = useState(false);
	const [message, setMessage] = useState("");
	
	const handleSelectChange = (selectedCountry) => {
		setSelectedCountry(selectedCountry);
		if (selectedCountry) {
			tagActions.addTag(selectedCountry.value);
		}
	}
	
	const customStyles = {
		option: (provided, state) => ({
			...provided,
			textAlign: "left",
			color: "#B2B2B1",
			cursor: "pointer"
		}),
		control: (provided, state) => ({
			...provided,
			borderRadius: '20px',
			marginTop: '5rem'
		})
	}
	
	const { Option } = components;
	
	const PlusIcon = props => (
		<Option {...props}>
			{props.data.label}
			<span className="float-right custom-font-color" style={{"fontWeight": "bold"}}>&#43;</span>
		</Option>
	);
	
	const handleShowTagList = (event) => {
		setShowTagList(true);
	}
	
	const handleShowCountryList = (event) => {
		setShowCountryList(true);
	}
	
	const hideCountryList = (event) => {
		setShowCountryList(false);
	}
	
	const handleClose = (event) => {
		setShowTagList(false);
		setShowCountryList(false);
		setMessage("activity saved");
	}

	return (
		<div className="container">
			{!showTagList && !message &&
				<div className="row">
					<div className="col-4" style={{"margin": "10rem auto"}}>
						<input type="text" className="form-control" onFocus={(event) => handleShowTagList(event)} placeholder={`write your text here`} />
					</div>
				</div>
			}
			{!showTagList && message &&
				<div className="row">
					<div className="col-4 custom-font-color" style={{"margin": "10rem auto"}}>
						{message}
					</div>
				</div>
			}
			{showCountryList &&
				<div className="row">
					<div className="col-4" style={{"margin": "5rem auto"}}>
						<button type="button" className="close custom-font-color" onClick={(event) => hideCountryList(event)}>
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
							components={{ Option: PlusIcon }}
						/>
						{selectedCountry && 
						<span className="d-block float-left mt-4 badge rounded-pill bg-secondary text-white">
							{selectedCountry.value}
						</span>
						}
					</div>
				</div>
			}
			{showTagList && !showCountryList &&
				<div className="row">
					<div className="col-4" style={{"margin": "10rem auto"}}>
					<div className="text-secondary mb-5">{`I'm going to Canada`}</div>
					{tags && tags.length !== 0 &&
						tags.map((element, index) => {
							return <div className="col-4 pl-1 d-inline-block" key={index}>
										<span className="badge rounded-pill bg-secondary text-white">
											{element}
										</span>
								   </div>
						})
					}
					{tags &&
						<React.Fragment>
							<div 
								className="col-4 d-inline-block ml-1 mt-2 badge rounded-pill bg-light custom-font-color"
								onClick={(event) => handleShowCountryList(event)}
								style={{"cursor": "pointer"}}
							>
								&#43;{` add tag`}
							</div>
							<div 
								className="custom-btn mt-4 float-right"
								onClick={(event) => handleClose(event)}
							>
							&gt;
							</div>
						</React.Fragment>
					}
					</div>
				</div>
			}
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