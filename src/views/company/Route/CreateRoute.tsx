import {
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber, message,
    Row,
    Select,
    SelectProps,
    Switch,
    Typography
} from 'antd';
import {useState} from 'react';
import {useAddRoute} from "../../../hooks/routes.hooks";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import AdminLayout from "../../../components/layouts/AdminLayout";
import {useStops} from "../../../hooks/stops.hooks";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {useNavigate} from "react-router-dom";
import CompanyLayout from "../../../components/layouts/CompanyLayout";

const {Option} = Select;

dayjs.extend(customParseFormat);

const CreateRoutePage = () => {
    const {mutate: createRoute} = useAddRoute();
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        const data = {
            routesDTO: {
                id: 0,
                startLocation,
                endLocation,
                startDateTime: startDate,
                endDateTime: endDate,
                availableSeats,
                pricePerSeat,
                totalSeats,
            },
            stopsDTOList: values.stops.map((stop: any) => ({location: stop})),
            recurrenceDTO: {
                days: recurrenceDays,
                everyNo: recurrenceNo,
                recurrenceType: !useRecurrence ? 'NONE' : recurrenceType,
                endDate: recurrenceEndDate,
            }
        }
        createRoute(data).then(() => {
            message.success('Route created successfully!');
            navigate('/routes');
        }).catch(() => {
            message.error('Failed to create route.');
        });
    };

    //startLocation
    const [startLocation, setStartLocation] = useState('');
    const handleStartLocationChange = (value: string) => {
        setStartLocation(value);
    };

    //endLocation
    const [endLocation, setEndLocation] = useState('');
    const handleEndLocationChange = (value: string) => {
        setEndLocation(value);
    };

    //startDate
    const [startDate, setStartDate] = useState('');
    const handleStartDateChange = (value: string) => {
        setStartDate(value);
    };

    //endDate
    const [endDate, setEndDate] = useState('');
    const handleEndDateChange = (value: string) => {
        setEndDate(value);
    };

    //availableSeats
    const [availableSeats, setAvailableSeats] = useState(1);
    const handleAvailableSeatsChange = (value: number) => {
        setAvailableSeats(value);
    };

    //pricePerSeat
    const [pricePerSeat, setPricePerSeat] = useState(1);
    const handlePricePerSeatChange = (value: number) => {
        setPricePerSeat(value);
    };

    //totalSeats
    const [totalSeats, setTotalSeats] = useState(1);
    const handleTotalSeatsChange = (value: number) => {
        setTotalSeats(value);
    };

    /* Recurrence */
    const [recurrenceNo, setRecurrenceNo] = useState(1);

    const [recurrenceType, setRecurrenceType] = useState('day');

    //endDate
    const [recurrenceEndDate, setRecurrenceEndDate] = useState('');
    const handleRecurrenceEndDateChange = (value: string) => {
        setRecurrenceEndDate(value);
    };

    /* Stops */
    const {data: stops} = useStops();

    const [recurrenceDays, setRecurrenceDays] = useState<number[]>([]);
    const handleChange = (value: number[]) => {
        setRecurrenceDays(value);
    };

    const [useRecurrence, setUseRecurrence] = useState(false);
    const handleUseRecurrence = (value: boolean) => {
        setUseRecurrence(value);
    };

    const options: SelectProps['options'] = [
        {
            label: 'Monday',
            value: '0'
        },
        {
            label: 'Tuesday',
            value: '1'
        },
        {
            label: 'Wednesday',
            value: '2'
        },
        {
            label: 'Thursday',
            value: '3'
        },
        {
            label: 'Friday',
            value: '4'
        },
        {
            label: 'Saturday',
            value: '5'
        },
        {
            label: 'Sunday',
            value: '6'
        }];

    return (
        <CompanyLayout>
            <Typography.Title level={2}>Create Route</Typography.Title>
            <Form
                name="route_form"
                onFinish={onFinish}
            >
                <section>
                    <Divider/>
<Typography.Title level={4}>Route Information</Typography.Title>
                <Row
                    style={{marginTop: 20}}>
                    <Col span={12}>
                <Form.Item
                    name="startLocation"
                >
                    <Typography.Title level={5}>Start Location</Typography.Title>
                    <Input type={'text'} placeholder="Start Location" style={{width: '20vw'}}
                           onChange={(e) => handleStartLocationChange(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    name="endLocation"
                >
                    <Typography.Title level={5}>End Location</Typography.Title>
                    <Input type={'text'} placeholder="End Location" style={{width: '20vw'}}
                           onChange={(e) => handleEndLocationChange(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    name="startDate"
                >
                    <Typography.Title level={5}>Start Date</Typography.Title>
                    <DatePicker
                        format="YYYY-MM-DDTHH:mm"
                        style={{width: '20vw'}}
                        showTime={{defaultValue: dayjs('00:00', 'HH:mm')}}
                        onChange={(e, day) => handleStartDateChange(day)}
                    />
                </Form.Item>

                <Form.Item
                    name="endDate"
                >
                    <Typography.Title level={5}>End Date</Typography.Title>
                    <DatePicker
                        style={{width: '20vw'}}
                        format="YYYY-MM-DDTHH:mm"
                        showTime={{defaultValue: dayjs('00:00', 'HH:mm')}}
                        onChange={(e, day) => handleEndDateChange(day)}
                    />
                </Form.Item>

                    </Col>
                    <Col span={12}>

                <Form.Item
                    name="availableSeats"
                >
                    <Typography.Title level={5}>Available Seats</Typography.Title>
                    <InputNumber min={1} max={1000} defaultValue={1}  style={{width: '10vw'}}
                                 onChange={(e) => e && handleAvailableSeatsChange(e)}/>
                </Form.Item>

                <Form.Item
                    name="pricePerSeat"
                >

                    <Typography.Title level={5}>Price Per Seat</Typography.Title>
                    <InputNumber prefix={'RON'}  style={{width: '10vw'}} min={1} max={1000} defaultValue={1} onChange={(e) => e && handlePricePerSeatChange(e)}/>
                </Form.Item>

                <Form.Item
                    name="totalSeats"
                >
                    <Typography.Title level={5}>Total Seats</Typography.Title>
                    <InputNumber  style={{width: '10vw'}} min={1} max={10000} defaultValue={1} onChange={(e) => e && handleTotalSeatsChange(e)}/>
                </Form.Item>

                        </Col>
                </Row>

                </section>

                <section>
                    <Divider/>
                    <Typography.Title level={4}>Recurrence</Typography.Title>
                    <Row
                        style={{marginTop: 40}}>
                        <Col span={24}>


                <Switch onChange={handleUseRecurrence} checkedChildren="Create Single"
                        unCheckedChildren="Create Recurrence"/>

                {useRecurrence && (
                    <>
                        <Form.Item
                            name="Every No"
                        >
                            <Typography.Title level={5}>Recurrence No</Typography.Title>
                            <Select defaultValue={1} onChange={setRecurrenceNo} style={{width: '10vw'}}>
                                {Array.from({length: 100}, (_, i) => i + 1).map((value) => (
                                    <Option key={value} value={value}>
                                        {value}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="Type"
                        >
                            <Typography.Title level={5}>Recurrence Type</Typography.Title>
                            <Select defaultValue="DAY" onChange={setRecurrenceType} style={{width: '10vw'}}>
                                <Option value="DAY">Day</Option>
                                <Option value="WEEK">Week</Option>
                            </Select>
                        </Form.Item>

                        {recurrenceType === "WEEK" && (
                        <Form.Item name="Choose days">
                            <Select
                                mode="tags"
                                style={{width: '10vw'}}
                                placeholder="Days..."
                                onChange={handleChange}
                                options={options}
                            />
                        </Form.Item>
                            )}

                        <Form.Item
                            name="recurrenceEndDate"
                        >
                            <Typography.Title level={5}>End Date</Typography.Title>
                            <DatePicker
                                style={{width: '20vw'}}
                                format="YYYY-MM-DDTHH:mm"
                                showTime={{defaultValue: dayjs('00:00', 'HH:mm')}}
                                onChange={(e, day) => handleRecurrenceEndDateChange(day)}
                            />
                        </Form.Item>
                    </>
                )}
                        </Col>
                    </Row>

                </section>

                <section>
                    <Divider/>
                    <Typography.Title level={4}>Stops</Typography.Title>
                <Row
                    style={{marginTop: 40}}>
                    <Col span={24}>

                <Form.List
                    name="stops"
                >
                    {(fields, {add, remove}, {errors}) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please select a stop.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Select style={{width: '60%'}} placeholder="Select Stop">
                                            {stops?.map((stop) => (
                                                <Option key={stop.location} value={stop.location}>
                                                    {stop.location}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            style={{marginLeft: 20}}
                                            onClick={() => remove(field.name)}
                                        />
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{width: '60%'}}
                                    icon={<PlusOutlined/>}
                                >
                                    Add new stop
                                </Button>
                                <Form.ErrorList errors={errors}/>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                        </Col>
                    </Row>


                <Form.Item>
                    <Button block type="primary" htmlType="submit" shape={'round'}>
                        Add Route
                    </Button>
                </Form.Item>

                </section>

            </Form>
        </CompanyLayout>
    );
}

export default CreateRoutePage;