package com.palantir.opensource.blog.xmlPullParsing;

/*
 * All source code and information in this file is made
 * available under the following licensing terms:
 *
 * Copyright (c) 2007, Palantir Technologies, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *
 *     * Redistributions in binary form must reproduce the above
 *       copyright notice, this list of conditions and the following
 *       disclaimer in the documentation and/or other materials provided
 *       with the distribution.
 *
 *     * Neither the name of Palantir Technologies, Inc. nor the names of its
 *       contributors may be used to endorse or promote products derived
 *       from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 */ 

import java.io.InputStream;

import javax.xml.XMLConstants;
import javax.xml.transform.Source;
import javax.xml.transform.sax.SAXSource;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

import com.palantir.opensource.PalantirException;

/**
 * The LifeOnEarthSchema is the Java object that represents the XML Schema
 * for instance documents that contain taxonomical information.
 * 
 * @author regs
 *
 */
public class LifeOnEarthSchema {

	static Logger log = LogManager.getLogger(LifeOnEarthSchema.class);

	/**
	 * Path we expect to find the schema at in the classpath.
	 */
	public static final String SCHEMA_PATH = "/lifeOnEarth.xsd";
	public static Schema lifeOnEarthSchema = null;

	/**
	 * Private method used to initialize a {@link Schema} object.
	 * Initializer for singleton pattern.  {@link Schema} are threadsafe
	 * and sharable.
	 * 
	 * @throws PalantirException
	 */
	private synchronized static void initializeSchema() throws PalantirException {
		try{
			InputStream is = null;
			is = LifeOnEarthSchema.class.getResourceAsStream(SCHEMA_PATH);
			if(is != null){
				Source schemaSource = new StreamSource(is);
				lifeOnEarthSchema = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI).newSchema(schemaSource);
			}
			else{
				throw new PalantirException("Couldn't find schema resource " + SCHEMA_PATH);
			}
		}
		catch(SAXException ie){
			String message = "Error while loading LifeOnEarth XML Schema";
			log.error(message,ie);
			throw new PalantirException(message,ie);
		}
		
	}
	
	/**
	 * Factory method for singleton schema.
	 * 
	 * @return {@link Schema} object.
	 * @throws PalantirException
	 */
	public static Schema getLifeOnEarthSchema() throws PalantirException {
		if(lifeOnEarthSchema == null){
			initializeSchema();
		}
		return lifeOnEarthSchema;
	}

	/**
	 * Verifys an instance document (as represented by the {@link InputStream}
	 * conforms to the Life On Earth XML Schema.
	 * 
	 * @param is - instance document
	 * @param logErrors - whether to log errors as well as throw an exception.
	 * @throws PalantirException - thrown on a validation error with {@link SAXException} as the cause.
	 */
	public static void verifyXMLInstanceDocument(InputStream is,boolean logErrors) throws PalantirException {
		try{
			Source document = new SAXSource(new InputSource(is));
			Validator v = getLifeOnEarthSchema().newValidator();
			v.setErrorHandler(XMLErrorHandler.getInstance(logErrors));
			v.validate(document);
		}
		catch(SAXParseException spe){
			throw new PalantirException("Validation failed at (line " + spe.getLineNumber() + ", col " + spe.getColumnNumber() + "): " + spe.getMessage(),spe);
		}
		catch(Exception e){
			throw new PalantirException("Validation failed before starting because of unexpected error: "+e.getMessage(),e);
		}
	}
}
