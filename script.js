/*
 *  Project 3
 *  Name: Kyle Bailey
 *  Date: 3/20/2022
 */

document.addEventListener("DOMContentLoaded", load);

let errorFlag = false;

/*
 * Handles the load event of the document.
 */
function load()
{
    document.getElementById("submit").addEventListener("click", validate);
	document.getElementById("reset").addEventListener("click", resetForm);

    hideErrors();
}

/*
 * Hides all the errors.
 */
function hideErrors()
{
	let error = document.getElementsByClassName("error");

	for ( let i = 0; i < error.length; i++ )
    {
		error[i].style.display = "none";
	}
}

/*
 * Handles the click event of the submit button.
 */
function validate(e)
{
	hideErrors();

	if(formHasErrors())
	{
		e.preventDefault();
		return false;
	}

    alert("Successfully submitted!");

    document.getElementById("home").click();

	return true;
}

/*
 * Handles the click event of the reset button.
 */
function resetForm(e)
{
	if (confirm('Reset form?'))
    {
		hideErrors();

		document.getElementById("fullname").focus();

        let inputs = ["fullname", "phone", "email", "comments"];

        for (let i = 0; i < inputs.length; i++)
        {
            document.getElementById(inputs[i]).value = "";
        }

		return true;
	}

	e.preventDefault();
	
	return false;	
}

/*
 * Checks if the form has errors.
 * Return - True if the form has errors.
 */
function formHasErrors()
{
    errorFlag = false;

    let inputs = ["fullname", "phone", "email", "comments"];
    let emailRegEx = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    let phoneRegEx = new RegExp(/^\d{10}$/);

    for (let i = 0; i < inputs.length; i++)
    {
        let userValue = document.getElementById(inputs[i]).value;

        if (userValue == "" || userValue.trim() == "")
        {
            if (!errorFlag)
            {
                document.getElementById(inputs[i]).focus();
                document.getElementById(inputs[i]).select();
            }

            updateErrors(inputs[i] + "_error");
        }

        if (i == 1 && document.getElementById(inputs[i] + "_error").style.display != "block")
        {
            if (!phoneRegEx.test(userValue))
            {
                if (!errorFlag)
                {
                    document.getElementById(inputs[i]).focus();
                    document.getElementById(inputs[i]).select();
                }

                updateErrors(inputs[i] + "format_error");
            }
        }

        if (i == 2 && document.getElementById(inputs[i] + "_error").style.display != "block")
        {
            if (!emailRegEx.test(userValue))
            {
                if (!errorFlag)
                {
                    document.getElementById(inputs[i]).focus();
                    document.getElementById(inputs[i]).select();
                }

                updateErrors(inputs[i] + "format_error");
            }
        }
    }

    return errorFlag;
}

/*
 * Makes the error flags visible and updates the variable.
 */
function updateErrors(IDName)
{
	document.getElementById(IDName).style.display = "block";

	errorFlag = true;
}